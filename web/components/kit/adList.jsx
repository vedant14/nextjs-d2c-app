import { useState, useEffect } from "react";
import axios from "axios";
import { useShop } from "@components/providers/Shop";
import {
  Card,
  Text,
  ButtonGroup,
  ResourceList,
  Thumbnail,
  TextContainer,
  ResourceItem,
  Button,
} from "@shopify/polaris";
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
      const response = await axios.get("/api/db/ad-actions", {
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

  function callAdAction(id, action) {
    const actionData = {
      shopID: shopData.id,
      action: action,
      adID: id,
    };
    axios
      .post("/api/db/ad-actions", actionData)
      .then(function (response) {
        // TODO: toast message and redirect
        setAdListData(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  function renderItem(item) {
    console.log(item);
    const media = (
      <Thumbnail
        size="large"
        source={item.products[0].image}
        alt={item.title}
      />
    );
    return (
      <ResourceItem
        verticalAlignment="center"
        id={item.id}
        media={media}
        accessibilityLabel={`View details for`}
        name={item.title}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <TextContainer>
            <Text variant="subdued">ID: {item.id}</Text>
          </TextContainer>
          <ButtonGroup segmented>
            <Button size="slim" monochrome>
              Edit
            </Button>
            {item.deactivated === true && (
              <Button
                size="slim"
                monochrome
                onClick={() => {
                  callAdAction(item.id, "activate");
                }}
              >
                Activate
              </Button>
            )}

            {item.deactivated === true ? (
              <Button
                size="slim"
                destructive
                outline
                onClick={() => {
                  callAdAction(item.id, "delete");
                }}
              >
                Delete
              </Button>
            ) : (
              <Button
                size="slim"
                destructive
                outline
                onClick={() => {
                  callAdAction(item.id, "delist");
                }}
              >
                Delist
              </Button>
            )}
          </ButtonGroup>
        </div>
        <div style={{ display: "flex" }}>
          <Text variant="subdued">Title: </Text>
          <span style={{ marginLeft: "10px" }}>
            <Text variant="strong">{item.title}</Text>
          </span>
        </div>
        <TextContainer>
          <Text variant="subdued">{item.description}</Text>
        </TextContainer>
        <div style={{ display: "flex" }}>
          <Text variant="subdued">Status: </Text>
          <span style={{ marginLeft: "5px" }}>
            <Text variant="positive">
              {item.deactivated === true ? "Delisted" : "Active"}
            </Text>
          </span>
        </div>
      </ResourceItem>
    );
  }
}
