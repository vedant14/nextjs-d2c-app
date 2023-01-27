import shopify from "@api-lib/shopify";
import { supabase } from "@api-lib/supbaseClient";

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
