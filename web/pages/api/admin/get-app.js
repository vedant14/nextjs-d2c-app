import shopify from "@api-lib/shopify";
import { verifyAuth } from "@api-lib/verify-auth";
import sessionStorage from "@api-lib/sessionStorage";
import { GET_APP_DATA } from "@api-lib/graphqlQueries";

// Online auth token callback
export default async function handler(request, response) {
  const { session } = await verifyAuth(request, response);
  const client = new shopify.clients.Graphql({
    session: session,
  });
  const data = await client.query({
    data: GET_APP_DATA,
  });
  return response.status(200).send({
    isPostPurchaseAppInUse: data.body.data.app.isPostPurchaseAppInUse,
  });
}
