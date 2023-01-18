import { Card, TextContainer, Stack, Link, Text } from "@shopify/polaris";
import { AdList, CustomLayout } from "@components/kit";
import { useShop } from "@components/providers/Shop";

export default function Home() {
  const { postPurchase } = useShop();
  console.log(postPurchase);
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
                D2C connect
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
