import { supabase } from "./supbaseClient";

export async function getShopByDomain(shopDomain, callback) {
  const { data: storeData, error } = await supabase
    .from("stores")
    .select("*")
    .eq("shop_url", shopDomain)
    .is("deleted_at", null);

  if (storeData.length === 0 || error) {
    // TODO: STORE DOES NOT EXIST CREATE A STORE
  } else {
    return callback(storeData[0]);
  }
}
