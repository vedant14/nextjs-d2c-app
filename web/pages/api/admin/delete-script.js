import shopify from "@api-lib/shopify";
import { verifyAuth } from "@api-lib/verify-auth";

// Online auth token callback
export default async function handler(request, response) {
  const { session } = await verifyAuth(request, response);
  const client = new shopify.clients.Graphql({
    session: session,
  });

  const metafields = await client.query({
    data: {
      query: `mutation scriptTagDelete($id: ID!) {
          scriptTagDelete(id: $id) {
            deletedScriptTagId
            userErrors {
              field
              message
            }
          }
        }
    `,
      variables: {
        id: "gid://shopify/ScriptTag/180316700877",
      },
    },
  });

  return response.status(200).send({
    data: true,
  });
}
