import { supabase } from "./supbaseClient";

export async function fetchShopByDomain(shopDomain, callback) {
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

export async function fetchShopByID(shopID, callback) {
  const { data: shopData } = await supabase
    .from("stores")
    .select("*")
    .eq("id", shopID)
    .is("deleted_at", null);
  return callback(shopData[0]);
}

export async function fetchAdRecordsByShopID(shopID, callback) {
  let { data: adverts, error } = await supabase
    .from("adverts")
    .select(`id, title, description, deactivated, products(title, image)`)
    .eq("store_id", shopID)
    .is("deleted_at", null)
    .order("created_at", { ascending: false });
  if (!error) {
    return callback(adverts);
  } else {
    return callback(false);
  }
}

export async function fetchOtherStoreRecords(shopID, callback) {
  let { data: stores, error } = await supabase
    .from("stores")
    .select(`id, store_name, shop_url, shop_description, blocked_stores`)
    .neq("id", shopID)
    .is("deleted_at", null);
  if (!error) {
    return callback(stores);
  } else {
    return callback(false);
  }
}
