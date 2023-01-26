import { supabase } from "./supbaseClient";
/*
      The storeCallback takes in the Session, and stores it on supabase
      This callback is used for BOTH saving new Sessions and updating existing Sessions.
      If the session can be stored, return true
      Otherwise, return false
  */
const storeCallback = async (session) => {
  try {
    await supabase.from("session").upsert(
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
    return true;
  } catch (err) {
    return false;
  }
};

/*
      The loadCallback takes in the id, and uses the getAsync method to access the session data
      If a stored session exists, it's parsed and returned
      Otherwise, return undefined
  */
const loadCallback = async (id) => {
  try {
    let { data: session, error } = await supabase
      .from("session")
      .select("request_body")
      .eq("session_id", id);
    if (session.length > 0) {
      return session[0].request_body;
    }
  } catch (err) {
    throw new Error(err);
  }
};

/*
      The deleteCallback takes in the id, and uses the mongodb `deleteOne` method to delete it from the store
      If the session can be deleted, return true
      Otherwise, return false
  */
const deleteCallback = async (id) => {
  try {
    await supabase.from("session").delete().eq("session_id", id);
    return true;
  } catch (err) {
    throw new Error(err);
  }
};

export default {
  storeCallback,
  loadCallback,
  deleteCallback,
};
