import { supabase } from "@api-lib/supbaseClient";
export default function handler(req, res) {
  const shopID = req.query.shopID;
  if (!shopID) {
    return res.status(404).send({ success: false });
  } else {
    fetchRecords(shopID, function (response) {
      return res.status(200).send(response);
    });
  }
}

export const config = {
  api: {
    externalResolver: true,
  },
};

export async function fetchRecords(shopID, callback) {
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
