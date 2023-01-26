import { CustomLayout, AdvertForm } from "@components/kit";
import { userLoggedInFetch } from "@lib/fetch";
import { useAppBridge } from "@shopify/app-bridge-react";

export default function ScriptsPage() {
  const app = useAppBridge();

  const fetchFunction = userLoggedInFetch(app);
  async function runDeleteScripts(e) {
    e.preventDefault();
    try {
      await fetchFunction(`/api/admin/delete-script`).then((res) => {
        if (!res) {
          return null;
        }
        return res?.json();
      });
    } catch (error) {
      console.error(error);
    }
  }
  async function runCreateScripts(e) {
    e.preventDefault();
    try {
      await fetchFunction(`/api/admin/create-script`).then((res) => {
        if (!res) {
          return null;
        }
        return res?.json();
      });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <CustomLayout title="Create a new ad">
      <button onClick={(e) => runDeleteScripts(e)}>Delete Scripts</button>
      <button onClick={(e) => runCreateScripts(e)}>Create Scripts</button>
      <button onClick={(e) => runCreateScripts(e)}>
        Create Orders Webhook
      </button>
      <button onClick={(e) => runCreateScripts(e)}>
        Delete Orders Webhook
      </button>
    </CustomLayout>
  );
}
