import { supabase } from "./supbaseClient";

export async function shopCreate(shopData, callback) {
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

export async function advertCreate(shopData, title, description, callback) {
  // TODO CHECK THIS TWICE first at data: adverts and then shopdata.id should store the id only
  const { data, error } = await supabase
    .from("adverts")
    .insert([
      {
        store_id: shopData.id,
        title: title,
        description: description,
      },
    ])
    .select();
  if (!error) {
    return callback(data[0].id);
  } else {
    return callback(false);
  }
}

export async function productCreate(
  advertData,
  productData,
  shopData,
  callback
) {
  // TODO: Check the data: stores
  const { data, error } = await supabase.from("products").insert([
    {
      advert_id: advertData,
      title: productData.title,
      image: productData.images[0]?.originalSrc, // TODO CREATE A THUMBNAIL
      handle: productData.handle,
      store_link: shopData.shop_url,
    },
  ]);
  if (!error) {
    return callback(true);
  } else {
    return callback(false);
  }
}
