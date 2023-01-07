import shopify from "@api-lib/shopify";
import sessionStorage from "@api-lib/sessionStorage";
import { supabase } from "@api-lib/supbaseClient";
import { GET_SHOP_DATA } from "@api-lib/graphqlQueries";
import axios from "axios";
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
    // Store online auth in Supabase
    await sessionStorage.storeCallback(session);

    let fetchShopData = true;
    let authEventType = null;

    let { data: stores, error } = await supabase
      .from("stores")
      .select("*")
      .eq("shop_url", shop);
    if (!stores) {
      authEventType = "install";
      console.log("This shop has never been installed", shop);
      //   await mongodb.collection("shops").insertOne({
      //     shopId: null, // TODO:
      //     shop: shop,
      //     scopes: session.scope,
      //     isInstalled: true,
      //     subscription: {},
      //     settings: {},
      //     installedAt: new Date(),
      //     uninstalledAt: null,
      //   });
    }
    // else if (!shopDoc.isInstalled) {
    //   authEventType = "reinstall";

    //   // This is a REINSTALL
    //   //   await mongodb.collection("shops").updateOne(
    //   //     {
    //   //       shop,
    //   //     },
    //   //     {
    //   //       $set: {
    //   //         scopes: session.scope,
    //   //         subscription: {},
    //   //         isInstalled: true,
    //   //         installedAt: new Date(),
    //   //         uninstalledAt: null,
    //   //       },
    //   //     }
    //   //   );
    // }
    else {
      authEventType = "reauth";
      // UNcomment this till 68
      // if (stores) {
      //   fetchShopData = false;
      // }

      // Update scopes
      //   await mongodb.collection("shops").updateOne(
      //     {
      //       shop,
      //     },
      //     {
      //       $set: {
      //         scopes: session.scope,
      //       },
      //     }
      //   );
      // }

      if (fetchShopData) {
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
          console.log(response);
        });
      }
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
