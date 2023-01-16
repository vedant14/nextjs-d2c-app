import { useShop } from "@components/providers/Shop";
import {
  Card,
  Text,
  ResourceList,
  Thumbnail,
  TextContainer,
  ResourceItem,
  Button,
} from "@shopify/polaris";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
export function AdList() {
  const { shopData } = useShop();
  const [adListData, setAdListData] = useState(null);
  useEffect(() => {
    if (shopData) {
      getList();
    }
  }, [shopData]);

  async function getList() {
    try {
      const response = await axios.get("/api/db/get-adverts", {
        params: {
          shopID: shopData.id,
        },
      });
      setAdListData(response.data);
    } catch (error) {
      console.error(error);
    }
  }
  if (!adListData) {
    return null;
  }
  return (
    <Card>
      <ResourceList
        resourceName={{ singular: "ad", plural: "ads" }}
        items={adListData}
        renderItem={renderItem}
      />
    </Card>
  );
}

function renderItem(item) {
  const media = (
    <Thumbnail size="large" source={item.products[0].image} alt={item.title} />
  );
  return (
    <ResourceItem
      verticalAlignment="center"
      id={item.id}
      media={media}
      accessibilityLabel={`View details for`}
      name={item.title}
    >
      <TextContainer>
        <Text variant="subdued">ID: {item.id}</Text>
      </TextContainer>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ display: "flex" }}>
          <Text variant="subdued">Title: </Text>
          <span style={{ marginLeft: "10px" }}>
            <Text variant="strong">{item.title}</Text>
          </span>
        </div>
        <div style={{ display: "flex" }}>
          <span style={{ marginLeft: "10px" }}>
            <Button
              size="slim"
              plain
              onClick={() => {
                setEditId(item.id);
                handleChange();
              }}
            >
              Edit
            </Button>
          </span>
          <span style={{ marginLeft: "5px" }}>
            <Button
              size="slim"
              plain
              destructive
              onClick={() => {
                setDeleteId(item.id);
                handleDeleteModal();
              }}
            >
              Delete
            </Button>
          </span>
        </div>
      </div>
      <TextContainer>
        <Text variant="subdued">{item.description}</Text>
      </TextContainer>
      <div style={{ display: "flex" }}>
        <Text variant="subdued">Status: </Text>
        <span style={{ marginLeft: "5px" }}>
          <Text variant="positive">Approved</Text>
        </span>
      </div>
    </ResourceItem>
  );
}
