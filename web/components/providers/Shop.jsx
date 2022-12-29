import { createContext, useEffect, useContext, useState } from "react";
import { useAppBridge } from "@shopify/app-bridge-react";
import { Page, Spinner } from "@shopify/polaris";
import { userLoggedInFetch } from "@lib/fetch";
const ShopContext = createContext({});
const ShopProvider = ({ children }) => {
  const app = useAppBridge();
  const fetchFunction = userLoggedInFetch(app);

  const [submitting, setSubmitting] = useState(true);
  const [shopData, setShopData] = useState({});
  const [sessionData, setSessionData] = useState(null);
  useEffect(() => {
    setSubmitting(true);
    getShopData();
  }, []);

  async function getShopData() {
    try {
      const resData = await fetchFunction(`/api/admin/get-shop`).then((res) => {
        if (!res) {
          return null;
        }
        return res?.json();
      });
      setSessionData(resData.session);
      setShopData(resData.shop);
      setSubmitting(false);
    } catch (error) {
      console.log(error);
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
      value={{ shopData, setShopData, sessionData, setSessionData }}
    >
      {children}
    </ShopContext.Provider>
  );
};

const useShop = () => {
  const { shopData, setShopData, sessionData, setSessionData } =
    useContext(ShopContext);

  return { shopData, setShopData, sessionData, setSessionData };
};

export { ShopProvider, useShop };
