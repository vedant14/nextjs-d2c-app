import shopify from "@api-lib/shopify";
import { supabase } from "@api-lib/supbaseClient";

export default async function handler(req, res) {
  const shop = req.body.shop;
  if (shop) {
    getSession(shop, function (session) {
      const client = new shopify.clients.Graphql({ session });
      createDraftOrder(client, function (draftOrderID) {
        createOrder(client, draftOrderID, function (response) {
          res.status(200).send({ response, draftOrderID });
        });
      });
    });
  } else {
    res.status(404).send("NO SHOP");
  }
}

async function createDraftOrder(client, callback) {
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
                variantId: "gid://shopify/ProductVariant/40311792140493",
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
