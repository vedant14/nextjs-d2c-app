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
    label: "New Ad",
    destination: `/new-advert`,
  });

  const activeLink = (pathName) => {
    if (!pathName) {
      return dashboardLink;
    }

    return null;
  };

  NavigationMenu.create(app, {
    items: [dashboardLink, newAdvertLink],
    active: activeLink(router?.pathname),
  });

  return null;
}
