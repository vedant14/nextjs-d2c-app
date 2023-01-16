import { Card, Text, TextContainer, Stack } from "@shopify/polaris";

export function AllStoresHead() {
  return (
    <div style={{ marginBottom: "20px" }}>
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
                These are the stores who can advertise on your shopify platform
              </Text>

              <p>
                If you want, you can click here to block stores whose
                advertisements you don't want your audience to see.
              </p>
              <p>
                If you block a store, your advertisements will also be not shown
                on their checkout page.
              </p>
            </TextContainer>
          </Stack.Item>
        </Stack>
      </Card>
    </div>
  );
}
