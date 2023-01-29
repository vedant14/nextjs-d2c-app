import shopify from "@api-lib/shopify";
import { loadOfflineSessionByShopDomain } from "@api-lib/supabaseSession";
export const config = {
  api: {
    externalResolver: true,
  },
};

export default async function handler(req, res) {
  const shop = req.body.shop;
  if (shop) {
    loadOfflineSessionByShopDomain(shop, function (session) {
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
