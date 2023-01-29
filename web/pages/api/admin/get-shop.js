import { verifyAuth } from "@api-lib/verify-auth";
import { getShopByDomain } from "@api-lib/supabaseGet";
export const config = {
  api: {
    externalResolver: true,
  },
};

export default async function handler(request, response) {
  const { shop } = await verifyAuth(request, response);

  getShopByDomain(shop, function (storeData) {
    // Should I check the session here as well
    return response.status(200).send({ shop: storeData });
  });
}
