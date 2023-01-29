import { supabase } from "./supbaseClient";
/*
      The storeCallback takes in the Session, and stores it on supabase
      This callback is used for BOTH saving new Sessions and updating existing Sessions.
      If the session can be stored, return true
      Otherwise, return false
 
      */

export async function storeSessionCallback(session) {
  let { error } = await supabase.from("session").upsert(
    [
      {
        session_id: session.id,
        shop: session.shop,
        request_body: session,
        isOnline: session.isOnline,
        scope: session.scope.split(","),
        updated_at: new Date().toISOString(),
      },
    ],
    { onConflict: "session_id" }
  );
  if (error) {
    console.error(error);
  }
}

/*
      The loadCallback takes in the id, and uses the getAsync method to access the session data
      If a stored session exists, it's parsed and returned
      Otherwise, return undefined
  */
export async function loadSessionCallback(id, callback) {
  let { data: session, error } = await supabase
    .from("session")
    .select("request_body")
    .eq("session_id", id);
  if (session.length > 0) {
    return callback(session[0].request_body);
  } else {
    console.error("SHU", error, session);
    return callback(false);
  }
}

export async function loadOfflineSessionByShopDomain(shop, callback) {
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
