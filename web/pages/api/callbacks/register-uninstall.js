import shopify from "@api-lib/shopify";

export default async function regUninstallWebhook(session, callback) {
  const client = new shopify.clients.Graphql({ session: session });
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
              "https://d2c-app.vercel.app/api/webhooks/uninstall-shop",
            format: "JSON",
          },
        },
      },
    })
    .then(() => {
      return callback("Uninstall Subscribed");
    })
    .catch((error) => {
      return callback(error.response);
    });
}
