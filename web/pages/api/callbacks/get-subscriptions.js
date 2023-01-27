import shopify from "@api-lib/shopify";
import { supabase } from "@api-lib/supbaseClient";

export default async function handler(req, res) {
  const shop = req.query.shop;
  if (shop) {
    getSession(shop, function (session) {
      const client = new shopify.clients.Graphql({ session });
      getSubScriptions();
      async function getSubScriptions() {
        await client
          .query({
            data: `query {
                    webhookSubscriptions(first: 2) {
                        edges {
                            node {
                                id
                                topic
                                endpoint {
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
            return res.status(200).send(response.body);
          })
          .catch((error) => {
            res.status(404).send(error.response);
          });
      }
    });
  } else {
    res.status(404).send("NO SHOPs");
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
