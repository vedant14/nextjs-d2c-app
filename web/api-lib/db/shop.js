import { supabase } from "@api-lib/supbaseClient";

const COLLECTION_SHOPS = "shops";

const shop = {
  get: async (shop, options = {}) => {
    const shopDoc = await supabase
      .from("stores")
      .select("*")
      .eq("shop_url", shop);

    if (!shopDoc) {
      throw `Can't find shopDoc of ${shop}`;
    }
    return shopDoc;
  },
};

export default shop;
