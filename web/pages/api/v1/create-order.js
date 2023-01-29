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
      const client = new shopify.clients.Graphql({ session });
      createDraftOrder(client, variantId, function (draftOrderID) {
        createOrder(client, draftOrderID, function (response) {
          res.status(200).send({ response, draftOrderID });
        });
      });
    });
  } else {
    res.status(404).send("NO SHOP");
  }
}

async function createDraftOrder(client, variantId, callback) {
  await client
    .query({
      data: {
        query: `mutation draftOrderCreate($input: DraftOrderInput!) {
        draftOrderCreate(input: $input) {
          draftOrder {
            id
          }
        }
      }`,
        variables: {
          input: {
            email: "vedantlohbare6@gmail.com",
            lineItems: [
              {
                variantId: variantId,
                quantity: 1,
              },
            ],
          },
        },
      },
    })
    .then((response) => {
      return callback(response.body.data.draftOrderCreate.draftOrder.id);
    })
    .catch((error) => {
      return callback(error);
    });
}

async function createOrder(client, orderId, callback) {
  await client
    .query({
      data: {
        query: `mutation draftOrderComplete($id: ID!) {
          draftOrderComplete(id: $id) {
            draftOrder {
              id
              order {
                id
              }
            }
          }
        }`,
        variables: {
          id: `${orderId}`,
        },
      },
    })
    .then((response) => {
      if (response.body.data.draftOrderComplete.draftOrder === null) {
        return callback(false);
      } else {
        return callback(response.body);
      }
    })
    .catch((error) => {
      return callback(error);
    });
}
