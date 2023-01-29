import { advertCreate, productCreate } from "@api-lib/supabasePost";

export const config = {
  api: {
    externalResolver: true,
  },
};

export default async function handler(req, res) {
  advertCreate(
    req.body.shopData,
    req.body.title,
    req.body.description,
    function (advert_id) {
      productCreate(
        advert_id,
        req.body.productData,
        req.body.shopData,
        function (response) {
          if (response === true) {
            res.status(200).json({ success: true });
          } else {
            res.status(200).json({ success: false });
          }
        }
      );
    }
  );
}
