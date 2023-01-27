import { supabase } from "@api-lib/supbaseClient";
export default async function postShop(shopData, callback) {
  shopCreate(shopData, function (response) {
    return callback(response);
  });
}
async function shopCreate(shopData, callback) {
  const { error } = await supabase.from("stores").insert({
    store_name: shopData.name,
    // tags: shopData.productTags,
    shop_url: shopData.myshopifyDomain,
    contact_email: shopData.contactEmail,
    checkoutApiSupported: shopData.checkoutApiSupported,
    owners_email: shopData.email,
    shop_description: shopData.description,
    shopify_store_id: Number(shopData.id.split("/").splice(-1)[0]),
  });
  if (error) {
    return callback(false);
  } else {
    return callback(true);
  }
}
