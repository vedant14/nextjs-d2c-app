import { supabase } from "./supbaseClient";
export async function activateAdvert(adID, callback) {
  let { error } = await supabase
    .from("adverts")
    .update({ deactivated: false })
    .eq("id", adID);
  if (!error) {
    return callback(true);
  } else {
    return callback(false);
  }
}
export async function delistAdvertbyID(adID, callback) {
  let { error } = await supabase
    .from("adverts")
    .update({ deactivated: true })
    .eq("id", adID);
  if (!error) {
    return callback(true);
  } else {
    return callback(false);
  }
}

export async function updateStoreBlockedList(
  shopID,
  blockedArrayData,
  callback
) {
  let { error } = await supabase
    .from("stores")
    .update({ blocked_stores: blockedArrayData })
    .eq("id", shopID)
    .is("deleted_at", null);
  if (!error) {
    return callback(true);
  } else {
    return callback(false);
  }
}
