import { deleteAdvertbyID } from "@api-lib/supabaseDelete";
import { fetchAdRecordsByShopID } from "@api-lib/supabaseGet";
import {
  activateAdvert,
  delistAdvert,
  delistAdvertbyID,
} from "@api-lib/supabaseUpdate";

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
      fetchAdRecordsByShopID(shopID, function (response) {
        return res.status(200).send(response);
      });
    }
  } else {
    adActionSupabase(req.body.adID, req.body.action, function (response) {
      if (response === true) {
        fetchAdRecordsByShopID(req.body.shopID, function (resData) {
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
      delistAdvertbyID(adID, callback);
      break;
    case "activate":
      activateAdvert(adID, callback);
      break;
    case "delete":
      deleteAdvertbyID(adID, callback);
      break;
  }
}
