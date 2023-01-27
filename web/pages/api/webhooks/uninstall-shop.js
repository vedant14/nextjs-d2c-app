import { supabase } from "@api-lib/supbaseClient";

export default async function handler(req, res) {
  deleteSessionsByDomain(req.body.domain, function (session) {
    deleteShopByID(req.body.id, function (store) {
      console.log(session, store);
      if (session === true && store === true) {
        return res.status(200).send(true);
      } else {
        return res.status(500).send({ session: session, store: store });
      }
    });
  });
}

async function deleteSessionsByDomain(domain, callback) {
  const { error } = await supabase.from("session").delete().eq("shop", domain);
  if (!error) {
    return callback(true);
  } else callback(error);
}

async function deleteShopByID(shopID, callback) {
  const { error } = await supabase
    .from("stores")
    .update({ deleted_at: new Date().toISOString() })
    .eq("shopify_store_id", shopID)
    .is("deleted_at", null);
  if (!error) {
    return callback(true);
  } else callback(error);
}
