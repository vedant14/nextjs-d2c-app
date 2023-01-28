import { verifyAuth } from "@api-lib/verify-auth";
import { supabase } from "@api-lib/supbaseClient";

export default async function handler(request, response) {
  const { shop } = await verifyAuth(request, response);
  const { data: storeData } = await supabase
    .from("stores")
    .select("*")
    .eq("shop_url", shop)
    .is("deleted_at", null);
  if (storeData.length === 0) {
    // TODO: STORE DOES NOT EXIST CREATE A STORE
  }
  return response.status(200).send({ shop: storeData[0], session: session });
}
