import shopify from "@api-lib/shopify";
import { loadOfflineSessionByShopDomain } from "@api-lib/supabaseSession";

export const config = {
  api: {
    externalResolver: true,
  },
};

export default async function handler(req, res) {
  const shop = req.body.shop;
  const variantId = req.body.variantId;
  if (shop || variantId) {
    loadOfflineSessionByShopDomain(shop, function (session) {
      if (session) {
        const client = new shopify.clients.Rest({ session });
        createOrder(client, variantId, function (response) {
          res.status(200).send(response);
        });
      } else {
        res.status(404).send("NO SHOP");
      }
    });
  } else {
    res.status(404).send("NO SHOP");
  }
}

async function createOrder(client, variantId, callback) {
  const orderBody = {
    order: {
      line_items: [
        {
          variant_id: variantId,
          quantity: 1,
          tax_lines: [{ rate: 0.018, title: "State tax" }],
        },
      ],
      customer: {
        email: "vedantlohbare22@gmail.com",
      },
    },
  };

  await client
    .post({
      path: "orders",
      data: orderBody,
    })
    .then((response) => {
      return callback(response.body);
    })
    .catch((error) => {
      return callback(error);
    });
}
