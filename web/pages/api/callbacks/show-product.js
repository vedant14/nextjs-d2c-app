import { supabase } from "@api-lib/supbaseClient";
import NextCors from "nextjs-cors";
export const config = {
  api: {
    externalResolver: true,
  },
};

export default async function handler(req, res) {
  await NextCors(req, res, {
    // Options
    methods: ["GET"],
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });

  const tag = req.query.tagId;
  if (tag) {
    getCurrentStore(tag, function (stores) {
      if (stores.length !== 0) {
        getAdsData(stores[0], function (adData) {
          if (adData) {
            let advertData = adData[Math.floor(Math.random() * adData.length)];
            createAdvertRecord(advertData, stores[0], function (adDisplay) {
              let response = `{
            "id": ${advertData.id},
            "adDisplayId": ${adDisplay[0]?.id},
            "title": "${advertData.title}",
            "description": "${advertData.description}",
            "productId": ${advertData.products[0].id},
            "productImage": "${advertData.products[0].image}"
          }`;
              const responseObject = JSON.parse(response);
              res.send(responseObject);
            });
          } else {
            res.send(null).status(200);
            console.log("Data not found");
          }
        });
      } else {
        res.send("No Store");
      }
    });
  } else {
    res.send("No Tag");
  }
}

async function getCurrentStore(store, callback) {
  console.log("Fetchings store for", store);
  let { data: stores, error } = await supabase
    .from("stores")
    .select("id, blocked_stores")
    .eq("shop_url", store);
  if (error) console.log(error);
  return callback(stores);
}

async function getAdsData(store, callback) {
  console.log("Fetching adds for", store);
  if (store.blocked_stores) {
    let { data: adverts, error } = await supabase
      .from("adverts")
      .select("*, products(id, image)")
      .neq("store_id", store.id)
      .eq("deactivated", false);
    // .filter("stores.isPostPurchaseAppInUse", "eq", true);
    // .not("store_id", "in", `(${store.blocked_stores.join()})`)
    if (error) console.log(error);
    return callback(adverts);
  } else {
    let { data: adverts, error } = await supabase
      .from("adverts")
      .select("*, products(id, image)")
      .neq("store_id", store.id)
      .eq("deactivated", false);
    if (error) console.log(error);
    return callback(adverts);
  }
}

async function createAdvertRecord(advertData, storeData, callback) {
  const { data, error } = await supabase
    .from("ad_display")
    .insert([
      {
        display_store_id: storeData.id,
        advert_id: advertData.id,
      },
    ])
    .select();
  if (error) console.log(error);
  return callback(data);
}
