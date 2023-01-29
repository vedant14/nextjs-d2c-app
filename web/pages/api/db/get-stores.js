import { fetchOtherStoreRecords } from "@api-lib/supabaseGet";

export default function handler(req, res) {
  const shopID = req.query.shopID;
  if (!shopID) {
    return res.status(404).send({ success: false });
  } else {
    fetchOtherStoreRecords(shopID, function (response) {
      return res.status(200).send(response);
    });
  }
}

export const config = {
  api: {
    externalResolver: true,
  },
};
