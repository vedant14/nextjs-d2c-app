import shopify from "@api-lib/shopify";
import { supabase } from "@api-lib/supbaseClient";

export default async function handler(req, res) {
  const shop = req.query.shop;
  if (shop) {
    getSession(shop, function (session) {
      const client = new shopify.clients.Graphql({ session });
      createOrderSubscription();
      async function createOrderSubscription() {
        await client
          .query({
            data: {
              query: `mutation webhookSubscriptionCreate($topic: WebhookSubscriptionTopic!, $webhookSubscription: WebhookSubscriptionInput!) {
                webhookSubscriptionCreate(
                  topic: $topic
                  webhookSubscription: $webhookSubscription
                ) {
                  webhookSubscription {
                    id
                    topic
                    format
                  }
                }
              }`,
              variables: {
                topic: "CREATE_CAR",
                webhookSubscription: {
                  callbackUrl: "https://ordersonshop.free.beeceptor.com",
                  format: "JSON",
                },
              },
            },
          })
          .then((response) => {
            return res.status(200).send(response.body);
          })
          .catch((error) => {
            res.status(404).send(error.response);
          });
      }
    });
  } else {
    res.status(404).send("NO SHOP");
  }
}

async function getSession(shop, callback) {
  let { data: session, error } = await supabase
    .from("session")
    .select(`request_body`)
    .eq("shop", shop)
    .eq("isOnline", false);
  if (!error) {
    return callback(session[0].request_body);
  } else {
    return callback(false);
  }
}
