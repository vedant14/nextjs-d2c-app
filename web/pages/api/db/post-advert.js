import { supabase } from "@api-lib/supbaseClient";
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

async function advertCreate(shopData, title, description, callback) {
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

async function productCreate(advertData, productData, shopData, callback) {
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
