import { verifyAuth } from "@api-lib/verify-auth";
import { supabase } from "@api-lib/supbaseClient";

export default async function handler(request, response) {
  const { shop, session } = await verifyAuth(request, response);
  // This is where I'll have to store the store information in the db.
  const shopDoc = await supabase
    .from("stores")
    .select("*")
    .eq("shop_url", shop);
  return response.status(200).send({ shop: shopDoc.data[0], session: session });
}
