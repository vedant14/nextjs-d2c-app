import shopify from "@api-lib/shopify";
import { verifyAuth } from "@api-lib/verify-auth";
import { ALL_SCRIPTS } from "@api-lib/graphqlQueries";

// Online auth token callback
export default async function handler(request, response) {
  const { session } = await verifyAuth(request, response);
  const client = new shopify.clients.Graphql({
    session: session,
  });
  await client
    .query({
      data: ALL_SCRIPTS,
    })
    .then((res) => {
      return response.status(200).send({
        data: res.body.data,
      });
    })
    .catch((error) => {
      return response.status(error.response.code).send({
        data: false,
      });
    });
}
