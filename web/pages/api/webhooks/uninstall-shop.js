import {
  deleteAdvertsByShopID,
  deleteSessionsByDomain,
  deleteShopByShopifyID,
} from "@api-lib/supabaseDelete";

export default async function handler(req, res) {
  deleteSessionsByDomain(req.body.domain, function (session) {
    deleteShopByShopifyID(req.body.id, function (store) {
      deleteAdvertsByShopID(store, function (adverts) {
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
