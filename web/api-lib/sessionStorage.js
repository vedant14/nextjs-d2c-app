import { supabase } from "./supbaseClient";
/*
      The storeCallback takes in the Session, and stores it on mongodb
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
          session: session.session,
          shop: session.shop,
          access_token: session.accessToken,
          request_body: session,
          scope: session.scope.split(","),
        },
      ],
      { onConflict: "session_id" }
    );
    return true;
  } catch (err) {
    throw new Error(err);
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
      return session[0];
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
