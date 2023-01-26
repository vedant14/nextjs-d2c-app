import { createContext, useEffect, useContext, useState } from "react";
import { useAppBridge } from "@shopify/app-bridge-react";
import { Page, Spinner } from "@shopify/polaris";
import { userLoggedInFetch } from "@lib/fetch";
const ShopContext = createContext({});
const ShopProvider = ({ children }) => {
  const app = useAppBridge();
  const fetchFunction = userLoggedInFetch(app);

  const [submitting, setSubmitting] = useState(true);
  const [isScript, setIsScript] = useState(null);
  const [shopData, setShopData] = useState({});

  useEffect(() => {
    setSubmitting(true);
    getShopData();
    getScriptData();
  }, []);

  async function getShopData() {
    try {
      const resData = await fetchFunction(`/api/admin/get-shop`).then((res) => {
        if (!res) {
          return null;
        }
        return res?.json();
      });
      setShopData(resData.shop);
      setSubmitting(false);
    } catch (error) {
      console.error(error);
    }
  }

  async function getScriptData() {
    try {
      const resData = await fetchFunction(`/api/admin/get-script`).then(
        (res) => {
          if (!res) {
            return null;
          }
          return res?.json();
        }
      );
      if (resData.data.scriptTags.nodes.length > 0) {
        setIsScript(true);
      } else {
        setIsScript(false);
        // TODO: createScript Call
      }
    } catch (error) {
      // TODO: Handle the authentication errors
    }
  }

  if (submitting) {
    return (
      <Page>
        <Spinner />
      </Page>
    );
  }

  return (
    <ShopContext.Provider
      value={{
        shopData,
        setShopData,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

const useShop = () => {
  const { shopData, setShopData } = useContext(ShopContext);

  return { shopData, setShopData };
};

export { ShopProvider, useShop };
