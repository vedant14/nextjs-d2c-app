import { useShop } from "@components/providers/Shop";
import axios from "axios";
import { useState, useEffect } from "react";
import { ShowStores } from "./storeResource";
export function AllStores() {
  const { shopData } = useShop();
  const [storesData, setStoresData] = useState(null);
  useEffect(() => {
    if (shopData.id) {
      getStores();
    }
  }, [shopData]);

  async function getStores() {
    try {
      const response = await axios.get("/api/db/get-stores", {
        params: {
          shopID: shopData.id,
        },
      });
      setStoresData(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  if (!storesData) {
    return null;
  } else return <ShowStores storesData={storesData} />;
}
