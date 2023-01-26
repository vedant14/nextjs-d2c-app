import { useState } from "react";
import axios from "axios";
import { CircleDisableMinor, CirclePlusMinor } from "@shopify/polaris-icons";
import {
  Card,
  Text,
  ResourceList,
  TextContainer,
  ResourceItem,
} from "@shopify/polaris";
import { useShop } from "@components/providers/Shop";
import { onlyUnique } from "@components/helpers/helpers";
import { useEffect } from "react";
export function ShowStores({ storesData }) {
  const [selectedItems, setSelectedItems] = useState([]);
  const { shopData, setShopData } = useShop();
  const [blockedStore, setBlockedStores] = useState(shopData.blocked_stores);

  async function getStoreAction(actionKey) {
    // call the store Action api
    if (actionKey === "block") {
      if (blockedStore) {
        var blockedArrayData = selectedItems
          .concat(blockedStore)
          .filter(onlyUnique);
      } else {
        var blockedArrayData = selectedItems;
      }
    } else {
      var blockedArrayData = blockedStore;
      selectedItems.map((item) => {
        if (blockedArrayData.indexOf(item) > -1) {
          blockedArrayData.splice(blockedArrayData.indexOf(item), 1);
        }
      });
    }
    const actionData = {
      shopID: shopData.id,
      blockedArrayData: blockedArrayData,
    };
    axios
      .post("/api/db/store-action", actionData)
      .then(function (response) {
        // TODO: toast message and redirect
        setShopData(response.data);
        setBlockedStores(response.data.blocked_stores);
        setSelectedItems([]);
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  const enableStore = () => {
    getStoreAction("unBlock");
  };

  const blockStore = () => {
    if (
      selectedItems
        .concat(shopData.blocked_stores)
        .filter(Number)
        .filter(onlyUnique).length >= storesData.length
    ) {
      // TODO: TOASTER
    } else {
      getStoreAction("block");
    }
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

  function BlockedTag({ id }) {
    if (blockStore && blockedStore?.includes(id)) {
      return (
        <TextContainer>
          <Text variation="subdued">
            This store is
            <span style={{ color: "red" }}> blocked </span>
            from showing adverts to your customers
          </Text>
        </TextContainer>
      );
    } else {
      return null;
    }
  }
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
