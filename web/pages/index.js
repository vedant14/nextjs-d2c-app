import { Card, TextContainer, Stack, Link, Text } from "@shopify/polaris";

import CustomLayout from "@components/kit/layout";

export default function Home() {
  return (
    <CustomLayout
      title="Overview"
      primaryActionText="New Ad"
      primaryActionLink="/new-advert"
    >
      <Card sectioned>
        <Stack
          wrap={false}
          spacing="extraTight"
          distribution="trailing"
          alignment="center"
        >
          <Stack.Item fill>
            <TextContainer spacing="loose">
              <Text variant="headingXl" as="h1">
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
    </CustomLayout>
  );
}
