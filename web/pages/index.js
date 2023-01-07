import { Card, TextContainer, Stack, Link, Text } from "@shopify/polaris";
import { Session } from "@shopify/shopify-api";
import { AdList, CustomLayout } from "@components/kit";
import { useEffect } from "react";
import { useShop } from "@components/providers/Shop";
import axios from "axios";

export default function Home() {
  const { sessionData, shopData } = useShop();
  // useEffect(() => {
  //   console.log("SS", sessionData.accessToken);
  //   // const sessionProperties = sessionData.toPropertyArray();
  //   axios
  //     .post("/api/db/get-shop", {
  //       sessionData,
  //     })
  //     .then(function (response) {
  //       console.log("response", response.data);
  //     });
  // }, []);
  function HeadingCard() {
    return (
      <Card sectioned>
        <Stack
          wrap={false}
          spacing="extraTight"
          distribution="trailing"
          alignment="center"
        >
          <Stack.Item fill>
            <TextContainer spacing="loose">
              <Text variant="headingLg" as="h1">
                All your active advertisements will be shown here
              </Text>

              <p>
                Your app is ready to explore! It contains everything you need to
                get started including the{" "}
                <Link url="https://polaris.shopify.com/" external>
                  Polaris design system
                </Link>
                ,{" "}
                <Link url="https://shopify.dev/api/admin-graphql" external>
                  Shopify Admin API
                </Link>
                , and{" "}
                <Link url="https://shopify.dev/apps/tools/app-bridge" external>
                  App Bridge
                </Link>{" "}
                UI library and components.
              </p>
            </TextContainer>
          </Stack.Item>
        </Stack>
      </Card>
    );
  }

  return (
    <CustomLayout
      title="Overview"
      primaryActionText="New Ad"
      primaryActionLink="/new-advert"
    >
      <HeadingCard />
      <AdList />
    </CustomLayout>
  );
}
