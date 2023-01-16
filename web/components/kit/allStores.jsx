import { useShop } from "@components/providers/Shop";
import { CircleDisableMinor, CirclePlusMinor } from "@shopify/polaris-icons";
import {
  Card,
  Text,
  ResourceList,
  Thumbnail,
  TextContainer,
  Link,
  ResourceItem,
  Stack,
  Button,
} from "@shopify/polaris";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
export function AllStores() {
  const { shopData } = useShop();
  const [storesData, setStoresData] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
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
  console.log(storesData);

  if (!storesData) {
    return null;
  } else return <ShowStores />;

  function renderItem(item) {
    const { id, store_name, shop_description } = item;
    return (
      <ResourceItem
        id={id}
        accessibilityLabel={`View details for ${store_name}`}
      >
        <TextContainer>
          <Text variation="strong">{store_name}</Text>
        </TextContainer>
        <TextContainer>
          <Text variation="subdued">{shop_description}</Text>
        </TextContainer>
        <BlockedTag id={id} />
      </ResourceItem>
    );
  }

  function BlockedTag({ id }) {
    if (storesData.blocked_stores && storesData.blocked_stores.includes(id)) {
      return (
        <TextContainer>
          <Text variation="subdued">
            This store is
            <Text variation="negative"> blocked </Text>
            from showing adverts to your customers
          </Text>
        </TextContainer>
      );
    } else {
      return null;
    }
  }

  function ShowStores() {
    const addBlockStoresArray = () => {
      var blockedStoresArray = [];
      blockedStoresArray = shopData.blocked_stores;
      blockedStoresArray = blockedStoresArray.concat(selectedItems);
      if (blockedStoresArray.length >= allShops.length) {
        setToasterText(`Error: You cannot block all the stores`);
      } else {
        setToasterText(`Blocking stores`);
        updateSupa(blockedStoresArray);
      }
    };

    const removeBlockStoresArray = () => {
      var blockedStoresArray = [];
      blockedStoresArray = shopData.blocked_stores;
      selectedItems.map(
        (item) =>
          (blockedStoresArray = blockedStoresArray.filter(function (person) {
            return person !== item;
          }))
      );
      setToasterText(`Un-blocking stores`);
      updateSupa(blockedStoresArray);
    };

    async function updateSupa(blockedStoresArray) {
      const { data, error } = await supabase
        .from("stores")
        .update({ blocked_stores: blockedStoresArray })
        .eq("id", shopData.id);
    }

    const enableStore = () => {
      removeBlockStoresArray();
      setActivateToaster(true);
      setSelectedItems([]);
    };

    const blockStore = () => {
      addBlockStoresArray();
      setActivateToaster(true);
      setSelectedItems([]);
    };

    const bulkActions = [
      {
        content: "Un-block store",
        icon: CirclePlusMinor,
        onAction: () => enableStore(),
      },
      {
        destructive: true,
        content: "Block store",
        icon: CircleDisableMinor,
        onAction: () => blockStore(),
      },
    ];
    function resolveItemIds({ id }) {
      return id;
    }
    return (
      <Card>
        <ResourceList
          resourceName={{ singular: "store", plural: "stores" }}
          items={storesData}
          renderItem={renderItem}
          selectedItems={selectedItems}
          onSelectionChange={setSelectedItems}
          bulkActions={bulkActions}
          resolveItemId={resolveItemIds}
        />
      </Card>
    );
  }
}
