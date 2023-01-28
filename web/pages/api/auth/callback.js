import shopify from "@api-lib/shopify";
import sessionStorage from "@api-lib/sessionStorage";
import { supabase } from "@api-lib/supbaseClient";
import { GET_SHOP_DATA } from "@api-lib/graphqlQueries";
import postShop from "../db/post-shop";
import regUninstallWebhook from "../callbacks/register-uninstall";
import regOrderWebhook from "../callbacks/register-order-create";
import { getSubs } from "../callbacks/get-subscriptions";
import createOrderStatusScript from "../callbacks/create-script";

// Online auth token callback
export default async function handler(request, response) {
  try {
    const callback = await shopify.auth.callback({
      isOnline: true,
      rawRequest: request,
      rawResponse: response,
    });

    const session = callback.session;
    const shop = session.shop;
    await sessionStorage.storeCallback(session);
    let { data: stores } = await supabase
      .from("stores")
      .select(`id`)
      .eq("shop_url", shop)
      .is("deleted_at", null);

    if (stores.length === 0) {
      // This shop has never been installed
      const sessionId = await shopify.session.getOfflineId(shop);
      const offlineSession = await sessionStorage.loadCallback(sessionId);

      // Create Shopify GraphQL Api Client
      const client = new shopify.clients.Graphql({
        session: offlineSession,
      });
      const data = await client.query({
        data: GET_SHOP_DATA,
      });
      const shopData = data.body.data.shop;
      postShop(shopData, function (response) {
        //TODO: See this response and show a toast message
        regOrderWebhook(session, function (webhookStatus) {
          console.log(webhookStatus);
        });
        regUninstallWebhook(session, function (webhookStatus) {
          console.log(webhookStatus);
        });
        createOrderStatusScript(session, function (scriptResponse) {
          console.log(scriptResponse);
        });
      });
    }
  } catch (error) {
    console.warn(error);
  }

  // Get embedded app url for redirection
  const redirectUrl = await shopify.auth.getEmbeddedAppUrl({
    rawRequest: request,
    rawResponse: response,
  });

  // Redirect to embedded app inside shop
  return response.redirect(302, redirectUrl);
}
