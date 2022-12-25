import { Page, Layout } from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";

export function CustomLayout({
  title,
  primaryActionText,
  primaryActionLink,
  children,
}) {
  let primaryAction = null;
  if (primaryActionText && primaryActionLink) {
    primaryAction = { content: primaryActionText, url: primaryActionLink };
  }

  return (
    <Page narrowWidth>
      <TitleBar title={title} primaryAction={primaryAction} />
      <Layout>
        <Layout.Section>{children}</Layout.Section>
      </Layout>
    </Page>
  );
}
