import shopify from "@api-lib/shopify";
import { supabase } from "@api-lib/supbaseClient";

export default async function handler(req, res) {
  const shop = req.body.shop;
  if (shop) {
    getSession(shop, function (session) {
      const client = new shopify.clients.Graphql({ session });
      getVariants(client, function (response) {
        res.status(200).send({ response });
      });
    });
  } else {
    res.status(404).send("NO SHOP");
  }
}

async function getVariants(client, callback) {
  await client
    .query({
      data: `query {
      productVariants(first: 2) {
        edges {
          node {
            id
          }
        }
      }
    }`,
    })
    .then((response) => {
      return callback(response.body);
    })
    .catch((error) => {
      return callback(error);
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
