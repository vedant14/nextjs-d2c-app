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

async function fetchRecords(shopID, callback) {
  let { data: adverts, error } = await supabase
    .from("adverts")
    .select(`id, title, description, products(title, image)`)
    .eq("store_id", shopID)
    .eq("deactivated", false);
  if (!error) {
    return callback(adverts);
  } else {
    return callback(false);
  }
}
