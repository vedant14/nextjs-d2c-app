import shopify from "@api-lib/shopify";

export default async function createOrderStatusScript(session, callback) {
  const client = new shopify.clients.Graphql({
    session: session,
  });

  // TODO: ERROR HANDLING HERE
  await client
    .query({
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
    })
    .then(() => {
      return callback("Script created");
    })
    .catch((error) => {
      return callback(error.response);
    });
}
