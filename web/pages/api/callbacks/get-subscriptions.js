import shopify from "@api-lib/shopify";

export async function getSubs(session, callback) {
  const client = new shopify.clients.Graphql({ session });
  await client
    .query({
      data: `query {
                    webhookSubscriptions(first: 10) {
                        edges {
                            node {
                                id
                                topic
                                endpoint {
                                    ... on WebhookPubSubEndpoint {
                                    pubSubProject
                                    pubSubTopic
                                    }                        
                                    __typename
                                    ... on WebhookHttpEndpoint {
                                        callbackUrl
                                    }
                                }
                            }
                        }
                    }
                }`,
    })
    .then((response) => {
      return callback(response.body);
    })
    .catch((error) => {
      callback(error.response);
    });
}
