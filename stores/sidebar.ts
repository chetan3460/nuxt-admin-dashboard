import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";
import { siteConfig } from "@/config/site";

export const useSidebarStore = defineStore("sidebar", () => {
  const collapsed = useStorage("sidebar-collapsed", false);
  const sidebarType = useStorage("sidebar-type", "classic");
  const subMenu = useStorage("sidebar-submenu", false);
  const sidebarBg = useStorage("sidebar-bg", siteConfig.sidebarBg);
  const mobileMenu = useStorage("sidebar-mobile-menu", false);

  function setCollapsed(value: boolean) {
    collapsed.value = value;
  }

  function setSidebarType(value: string) {
    sidebarType.value = value;
  }

  function setSubmenu(value: boolean) {
    subMenu.value = value;
  }

  function setSidebarBg(value: string) {
    sidebarBg.value = value;
  }

  function setMobileMenu(value: boolean) {
    mobileMenu.value = value;
  }

  return {
    collapsed,
    setCollapsed,
    sidebarType,
    setSidebarType,
    subMenu,
    setSubmenu,
    sidebarBg,
    setSidebarBg,
    mobileMenu,
    setMobileMenu,
  };
});
