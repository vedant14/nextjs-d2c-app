import shopify from "@api-lib/shopify";
import { verifyAuth } from "@api-lib/verify-auth";

// Online auth token callback
export default async function handler(request, response) {
  const { session } = await verifyAuth(request, response);
  const client = new shopify.clients.Graphql({
    session: session,
  });

  const scriptCreateQuery = `query{
    mutation scriptTagCreate($input: ScriptTagInput!) {
        scriptTagCreate(input: $input) {
            scriptTag {
                id
            }
            userErrors {
                field
                message
            }
        }
    }
  }`;

  const metafields = await client.query({
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
          src: "https://f511-2406-7400-73-81d0-d75-1169-7878-5153.ngrok.io/test-script.js",
          displayScope: "ALL",
        },
      },
    },
  });

  console.log(metafields.body.data.scriptTagCreate);
  return response.status(200).send({
    data: true,
  });
}
