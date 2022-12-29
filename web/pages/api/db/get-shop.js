import { verifyAuth } from "@api-lib/verify-auth";
import { useShop } from "@components/providers/Shop";
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

export default async function handler(req, res) {
  return res.status(200).send({ success: false });
}

// async function getProducts(callback) {
//   const client = new shopify.clients.Graphql({ session });
//   const products = await client.query({
//     data: queryString,
//   });
// }

// async function getSessionToken(callback) {
//   let { data: session, error } = await supabase
//     .from("session")
//     .select(`access_token`)
//     .eq("id", "7");
//   if (!error) {
//     return callback(session[0].access_token);
//   } else {
//     return callback(false);
//   }
// }
