import shopify from "@api-lib/shopify";
import sessionStorage from "@api-lib/sessionStorage";
import { supabase } from "@api-lib/supbaseClient";
import { GET_SHOP_DATA } from "@api-lib/graphqlQueries";
import postShop from "../db/post-shop";

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
    let { data: stores, error } = await supabase
      .from("stores")
      .select(`id`)
      .eq("shop_url", shop);
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
