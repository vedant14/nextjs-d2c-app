import { fetchShopByID } from "@api-lib/supabaseGet";
import { updateStoreBlockedList } from "@api-lib/supabaseUpdate";

export const config = {
  api: {
    externalResolver: true,
  },
};

export default async function handler(req, res) {
  updateStoreBlockedList(
    req.body.shopID,
    req.body.blockedArrayData,
    function (response) {
      if (response === true) {
        fetchShopByID(req.body.shopID, function (resData) {
          res.status(200).json(resData);
        });
      } else {
        res.status(500).json({ success: false });
      }
    }
  );
}
