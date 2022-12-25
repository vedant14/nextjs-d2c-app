import { supabase } from "@api-lib/supbaseClient";
export default async function handler(req, res) {
  // console.log(req.body.mobileNumber);
  const shopID = req.query.shopID;
  if (!shopID) {
    res.status(404).json({ success: false });
  } else {
    fetchRecords(shopID, function (response) {
      res.status(200).json(response);
    });
  }
}

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
