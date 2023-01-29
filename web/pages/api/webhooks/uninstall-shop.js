import { supabase } from "@api-lib/supbaseClient";

export default async function handler(req, res) {
  deleteSessionsByDomain(req.body.domain, function (session) {
    deleteShopByShopifyID(req.body.id, function (store) {
      deleteAdvertsByID(store, function (adverts) {
        if (session === true && adverts === true) {
          return res.status(200).send(true);
        } else {
          return res
            .status(500)
            .send({ session: session, store: store, adverts: adverts });
        }
      });
    });
  });
}

async function deleteSessionsByDomain(domain, callback) {
  const { error } = await supabase.from("session").delete().eq("shop", domain);
  if (!error) {
    return callback(true);
  } else callback(error);
}

async function deleteShopByShopifyID(shopID, callback) {
  const { data: stores, error } = await supabase
    .from("stores")
    .update({ deleted_at: new Date().toISOString() })
    .eq("shopify_store_id", shopID)
    .is("deleted_at", null)
    .select();
  if (!error) {
    return callback(stores[0].id);
  } else callback(error);
}

async function deleteAdvertsByID(shopID, callback) {
  // TODO: Delete the adverts too
  const { error } = await supabase
    .from("adverts")
    .update({ deleted_at: new Date().toISOString(), deactivated: true })
    .eq("store_id", shopID)
    .is("deleted_at", null);
  if (!error) {
    return callback(true);
  } else callback(error);
}
