import { shopCreate } from "@api-lib/supabasePost";

export default async function postShop(shopData, callback) {
  shopCreate(shopData, function (response) {
    return callback(response);
  });
}
