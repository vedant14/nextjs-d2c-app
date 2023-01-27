import shopify from "@api-lib/shopify";
import { supabase } from "@api-lib/supbaseClient";

export default async function handler(req, res) {
  const queryString = `{
    products (first: 3) {
      edges {
        node {
          id
          title
        }
      }
    }
  }`;
  const shop = req.query.shop;
  if (shop) {
    getSession(shop, function (session) {
      const client = new shopify.clients.Graphql({
        session: session,
      });
      getProducts();
      async function getProducts() {
        const products = await client.query({
          data: queryString,
        });
        res.status(200).send(products);
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
