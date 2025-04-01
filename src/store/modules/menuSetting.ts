import { defineStore } from "pinia";

const useMenuSettingStore = defineStore("menuSetting", () => {
  const isCollapse = ref(false);
  const refreshing = ref(false);

  return {
    isCollapse,
    refreshing,
  };
});

export default useMenuSettingStore;
