import { supabase } from "@api-lib/supbaseClient";

export const config = {
  api: {
    externalResolver: true,
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    const shopID = req.query.shopID;
    if (!shopID) {
      return res.status(404).send({ success: false });
    } else {
      fetchRecords(shopID, function (response) {
        return res.status(200).send(response);
      });
    }
  } else {
    adActionSupabase(req.body.adID, req.body.action, function (response) {
      if (response === true) {
        fetchRecords(req.body.shopID, function (resData) {
          res.status(200).json(resData);
        });
      } else {
        res.status(200).json({ success: false });
      }
    });
  }
}

async function adActionSupabase(adID, action, callback) {
  switch (action) {
    case "delist":
      delistAdvert();
      break;
    case "activate":
      activateAdvert();
      break;
    case "delete":
      deleteAdvert();
      break;
  }

  async function activateAdvert() {
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
  async function delistAdvert() {
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
  async function deleteAdvert() {
    let { error } = await supabase
      .from("adverts")
      .update({ deleted_at: new Date().toISOString() })
      .eq("id", adID);
    console.log(error);
    if (!error) {
      return callback(true);
    } else {
      return callback(false);
    }
  }
}

async function fetchRecords(shopID, callback) {
  let { data: adverts, error } = await supabase
    .from("adverts")
    .select(`id, title, description, deactivated, products(title, image)`)
    .eq("store_id", shopID)
    .is("deleted_at", null)
    .order("created_at", { ascending: false });
  if (!error) {
    return callback(adverts);
  } else {
    return callback(false);
  }
}
