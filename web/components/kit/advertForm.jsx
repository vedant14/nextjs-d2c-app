import { useState } from "react";
import {
  Card,
  Form,
  FormLayout,
  Image,
  TextField,
  List,
  TextContainer,
  Button,
  ButtonGroup,
} from "@shopify/polaris";
import { ResourcePicker } from "@shopify/app-bridge-react";
import { Toast } from "@shopify/app-bridge-react";

export default function NewAdvert() {
  const emptyToastProps = { content: null };
  const [toastProps, setToastProps] = useState(emptyToastProps);
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [title, setTitle] = useState(
    selectedProduct ? selectedProduct.title : ""
  );
  const [adCopy, setAdCopy] = useState("");
  const toastMarkup = toastProps.content && !isRefetchingCount && (
    <Toast {...toastProps} onDismiss={() => setToastProps(emptyToastProps)} />
  );
  console.log(title);
  function callResourcePicker() {
    setOpen(true);
  }

  function nullifyProduct() {
    setSelectedProduct(null);
  }
  function handleSubmit() {
    setSelectedProduct(null);
  }
  return (
    <>
      {toastMarkup}
      <ResourcePicker
        resourceType="Product"
        onCancel={() => setOpen(false)}
        open={open}
        selectMultiple={false}
        showVariants={false}
        onSelection={(resources) => {
          setSelectedProduct(resources.selection[0]);
          setOpen(false);
        }}
      />

      {selectedProduct ? (
        <div>
          <div>&nbsp;</div>
          <Card
            actions={[
              {
                content: "Remove",
                destructive: true,
                onAction: nullifyProduct,
              },
            ]}
            title={selectedProduct.title}
          >
            <Card.Section>
              <div style={{ display: "flex" }}>
                <Image
                  width={"100px"}
                  source={selectedProduct.images[0]?.originalSrc}
                  alt={selectedProduct.images[0]?.altText}
                />
                <List>
                  <List.Item>
                    Total Inventory: {selectedProduct.totalInventory}
                  </List.Item>
                </List>
              </div>
            </Card.Section>
          </Card>
          <div>&nbsp;</div>

          <Form onSubmit={handleSubmit}>
            <FormLayout>
              <Card>
                <Card.Section>
                  <TextField
                    label="Title"
                    value={title}
                    onChange={(newValue) => setTitle(newValue)}
                    clearButton
                    onClearButtonClick={() => setTitle("")}
                    helpText={<span>Title of your advertisement</span>}
                  />
                  <TextField
                    label="Ad Copy"
                    value={adCopy}
                    multiline={4}
                    onChange={(newValue) => setAdCopy(newValue)}
                    helpText={<span>Make this grand</span>}
                  />
                  <ButtonGroup>
                    <Button>Cancel</Button>
                    <Button primary submit>
                      Submit
                    </Button>
                  </ButtonGroup>
                </Card.Section>
              </Card>
            </FormLayout>
          </Form>
          <div>&nbsp;</div>
        </div>
      ) : (
        <Button onClick={callResourcePicker}>Select Product</Button>
      )}
    </>
  );
}
