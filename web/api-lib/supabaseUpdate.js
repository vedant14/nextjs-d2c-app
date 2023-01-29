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
