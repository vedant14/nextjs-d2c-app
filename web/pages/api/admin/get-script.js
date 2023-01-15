import shopify from "@api-lib/shopify";
import { verifyAuth } from "@api-lib/verify-auth";
import { GET_SCRIPT_TAG } from "@api-lib/graphqlQueries";

// Online auth token callback
export default async function handler(request, response) {
  const { session } = await verifyAuth(request, response);
  const client = new shopify.clients.Graphql({
    session: session,
  });
  const data = await client.query({
    data: GET_SCRIPT_TAG,
  });
  console.log(data.body.data);
  return response.status(200).send({
    data: data.body.data,
  });
}
