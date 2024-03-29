import { useRouter } from "next/router";
import { useAppBridge } from "@shopify/app-bridge-react";
import { NavigationMenu, AppLink } from "@shopify/app-bridge/actions";

export function AppBridgeNavigation() {
  const app = useAppBridge();
  const router = useRouter();

  const dashboardLink = AppLink.create(app, {
    label: "Overview",
    destination: `/`,
  });
  const newAdvertLink = AppLink.create(app, {
    label: "Create Ad",
    destination: `/new-advert`,
  });
  const settingsLink = AppLink.create(app, {
    label: "Settings",
    destination: `/settings`,
  });

  const activeLink = (pathName) => {
    if (!pathName) {
      return dashboardLink;
    }

    return null;
  };

  NavigationMenu.create(app, {
    items: [dashboardLink, newAdvertLink, settingsLink],
    active: activeLink(router?.pathname),
  });

  return null;
}
