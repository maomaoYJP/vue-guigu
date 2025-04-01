import { defineStore } from "pinia";

const useMenuSettingStore = defineStore("menuSetting", () => {
  const isCollapse = ref(false);

  return {
    isCollapse,
  };
});

export default useMenuSettingStore;
