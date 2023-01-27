import shopify from "@api-lib/shopify";

export default async function regOrderWebhook(session, callback) {
  const client = new shopify.clients.Graphql({ session });
  await client
    .query({
      data: {
        query: `mutation pubSubWebhookSubscriptionCreate($topic: WebhookSubscriptionTopic!, $webhookSubscription: PubSubWebhookSubscriptionInput!) {
          pubSubWebhookSubscriptionCreate(
            topic: $topic
            webhookSubscription: $webhookSubscription
          ) {
            webhookSubscription {
              id
              topic
              format
              endpoint {
                __typename
                ... on WebhookPubSubEndpoint {
                  pubSubProject
                  pubSubTopic
                }
              }
            }
          }
        }`,
        variables: {
          topic: "ORDERS_CREATE",
          webhookSubscription: {
            pubSubProject: "coworkingspaces-48082",
            pubSubTopic: "shopifyD2C",
            format: "JSON",
          },
        },
      },
    })
    .then((response) => {
      return callback(response.body);
    })
    .catch((error) => {
      return callback(error.response);
    });
}
