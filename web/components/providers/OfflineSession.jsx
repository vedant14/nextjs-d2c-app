import { supabase } from "@api-lib/supbaseClient";

export async function getSession(shop, callback) {
  let { data: session, error } = await supabase
    .from("session")
    .select(`request_body`)
    .eq("shop", shop)
    .eq("isOnline", false);
  if (!error) {
    return callback(session[0].request_body);
  } else {
    return callback(false);
  }
}
