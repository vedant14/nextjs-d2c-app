import { useRouter } from "next/router";
import { AppProvider as PolarisProvider } from "@shopify/polaris";
import polarisTranslations from "@shopify/polaris/locales/en.json";
import "@shopify/polaris/build/esm/styles.css";

import { App, Link } from "@components/core";
import { AppBridgeProvider, ErrorProvider } from "@components/providers";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  // Login Page
  if (router.pathname === "/login" || router.pathname === "/_error") {
    return (
      <ErrorProvider>
        <PolarisProvider i18n={polarisTranslations} linkComponent={Link}>
          <Component {...pageProps} />
        </PolarisProvider>
      </ErrorProvider>
    );
  }

  return (
    <ErrorProvider>
      <PolarisProvider i18n={polarisTranslations} linkComponent={Link}>
        <AppBridgeProvider>
          <App pageProps={pageProps}>
            <Component {...pageProps} />
          </App>
        </AppBridgeProvider>
      </PolarisProvider>
    </ErrorProvider>
  );
}

export default MyApp;
