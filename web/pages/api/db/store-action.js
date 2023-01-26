import { supabase } from "@api-lib/supbaseClient";

export const config = {
  api: {
    externalResolver: true,
  },
};

export default async function handler(req, res) {
  storeActionSupabase(
    req.body.shopID,
    req.body.blockedArrayData,
    function (response) {
      if (response === true) {
        fetchCurrentStore(req.body.shopID, function (resData) {
          res.status(200).json(resData);
        });
      } else {
        res.status(200).json({ success: false });
      }
    }
  );
}

async function storeActionSupabase(shopID, blockedArrayData, callback) {
  let { error } = await supabase
    .from("stores")
    .update({ blocked_stores: blockedArrayData })
    .eq("id", shopID);
  if (!error) {
    return callback(true);
  } else {
    return callback(false);
  }
}

async function fetchCurrentStore(shopID, callback) {
  const { data: shopData } = await supabase
    .from("stores")
    .select("*")
    .eq("id", shopID)
    .is("deleted_at", null);
  return callback(shopData[0]);
}
