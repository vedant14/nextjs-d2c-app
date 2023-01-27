import shopify from "@api-lib/shopify";
import { getSession } from "@components/providers/OfflineSession";

export default async function handler(req, res) {
  const shop = req.body.shop;
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
                    endpoint {
                        __typename
                        ... on WebhookHttpEndpoint {
                          callbackUrl
                        }
                    }
                  }
                }
              }`,
              variables: {
                topic: "APP_UNINSTALLED",
                webhookSubscription: {
                  callbackUrl:
                    "https://ordersonshop.free.beeceptor.com/uninstall",
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
