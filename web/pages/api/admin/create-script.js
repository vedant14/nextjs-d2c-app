import shopify from "@api-lib/shopify";
import { verifyAuth } from "@api-lib/verify-auth";

// Online auth token callback
export default async function handler(request, response) {
  const { session } = await verifyAuth(request, response);
  const client = new shopify.clients.Graphql({
    session: session,
  });

  // TODO: ERROR HANDLING HERE
  await client.query({
    data: {
      query: `mutation scriptTagCreate($input: ScriptTagInput!) {
        scriptTagCreate(input: $input) {
            scriptTag {
                id
            }
            userErrors {
                field
                message
            }
        }
      }`,
      variables: {
        input: {
          src: "https://d2c-app.vercel.app/d2c-connect-script-tag.js",
          displayScope: "ORDER_STATUS",
        },
      },
    },
  });

  return response.status(200).send({
    data: true,
  });
}
