import shopify from "@api-lib/shopify";
import { verifyAuth } from "@api-lib/verify-auth";
import { ALL_SCRIPTS } from "@api-lib/graphqlQueries";

// Online auth token callback
export default async function handler(request, response) {
  const { session } = await verifyAuth(request, response);
  const client = new shopify.clients.Graphql({
    session: session,
  });
  const data = await client.query({
    data: ALL_SCRIPTS,
  });
  // console.log(data.body.data.scriptTags);
  return response.status(200).send({
    data: data.body.data,
  });
}
