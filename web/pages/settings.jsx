import { AllStores, AllStoresHead, CustomLayout } from "@components/kit";

export default function SettingsPage() {
  return (
    <CustomLayout
      title="Settings"
      text="If you want, you can click here to block stores whose advertisements you don't want your audience to see"
    >
      <AllStoresHead />
      <AllStores />
    </CustomLayout>
  );
}
