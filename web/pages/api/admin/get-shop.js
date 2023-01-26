import { verifyAuth } from "@api-lib/verify-auth";
import { supabase } from "@api-lib/supbaseClient";

export default async function handler(request, response) {
  const { shop } = await verifyAuth(request, response);
  const shopDoc = await supabase
    .from("stores")
    .select("*")
    .eq("shop_url", shop);
  return response.status(200).send({ shop: shopDoc.data[0] });
}
