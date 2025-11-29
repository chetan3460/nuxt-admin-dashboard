<script setup lang="ts">
import { cn, isLocationMatch } from "@/utils";
import { useSidebarStore } from "@/stores/sidebar";
import SidebarLogo from "../common/Logo.vue";
import { menusConfig } from "@/config/menus";
import MenuLabel from "../common/MenuLabel.vue";
import Separator from "@/components/ui/separator/Separator.vue";
import ScrollArea from "@/components/ui/scroll-area/ScrollArea.vue";
import SingleMenuItem from "./SingleMenuItem.vue";
import SubMenuHandler from "./SubMenuHandler.vue";
import NestedSubMenu from "../common/NestedSubMenu.vue";

const sidebarStore = useSidebarStore();
const { collapsed, sidebarBg } = storeToRefs(sidebarStore);
const { setCollapsed } = sidebarStore;

const activeSubmenu = ref<number | null>(null);
const activeMultiMenu = ref<number | null>(null);
const menus = menusConfig?.sidebarNav?.classic || [];
const hovered = ref(false);

const toggleSubmenu = (i: number) => {
  if (activeSubmenu.value === i) {
    activeSubmenu.value = null;
  } else {
    activeSubmenu.value = i;
  }
};

const toggleMultiMenu = (subIndex: number) => {
  if (activeMultiMenu.value === subIndex) {
    activeMultiMenu.value = null;
  } else {
    activeMultiMenu.value = subIndex;
  }
};

const route = useRoute();
const locationName = computed(() => route.path);

watch(
  locationName,
  () => {
    let subMenuIndex: number | null = null;
    let multiMenuIndex: number | null = null;
    menus?.map((item: any, i: number) => {
      if (item?.child) {
        item.child.map((childItem: any, j: number) => {
          if (isLocationMatch(childItem.href, locationName.value)) {
            subMenuIndex = i;
          }
          if (childItem?.multi_menu) {
            childItem.multi_menu.map((multiItem: any, k: number) => {
              if (isLocationMatch(multiItem.href, locationName.value)) {
                subMenuIndex = i;
                multiMenuIndex = j;
              }
            });
          }
        });
      }
    });
    activeSubmenu.value = subMenuIndex;
    activeMultiMenu.value = multiMenuIndex;
  },
  { immediate: true }
);
</script>

<template>
  <div
    @mouseenter="hovered = true"
    @mouseleave="hovered = false"
    :class="
      cn('fixed z-[999] top-0 bg-card h-full', {
        'w-[244px]': !collapsed,
        'w-[72px]': collapsed,
        'shadow-md': collapsed || hovered,
      })
    "
  >
    <div
      v-if="sidebarBg !== 'none'"
      class="absolute left-0 top-0 z-[-1] w-full h-full bg-cover bg-center opacity-[0.07]"
      :style="{ backgroundImage: `url(${sidebarBg})` }"
    ></div>

    <SidebarLogo :hovered="hovered" />

    <ScrollArea
      :class="
        cn('sidebar-menu h-[calc(100%-80px)]', {
          'px-4': !collapsed || hovered,
        })
      "
    >
      <ul
        :class="
          cn('space-y-1', {
            'space-y-2 text-center': collapsed,
            'text-start': collapsed && hovered,
          })
        "
      >
        <li v-for="(item, i) in menus" :key="`menu_key_${i}`">
          <!-- single menu -->
          <SingleMenuItem
            v-if="!item.child && !item.isHeader"
            :item="item"
            :collapsed="collapsed"
            :hovered="hovered"
          />

          <!-- menu label -->
          <MenuLabel
            v-if="item.isHeader && !item.child && (!collapsed || hovered)"
            :item="item"
          />

          <!-- sub menu -->
          <template v-if="item.child">
            <SubMenuHandler
              :item="item"
              :index="i"
              :activeSubmenu="activeSubmenu"
              :collapsed="collapsed"
              :hovered="hovered"
              @toggleSubmenu="toggleSubmenu"
            />

            <NestedSubMenu
              v-if="!collapsed || hovered"
              :activeSubmenu="activeSubmenu"
              :item="item"
              :index="i"
              :activeMultiMenu="activeMultiMenu"
              :collapsed="collapsed"
              :hovered="hovered"
              @toggleMultiMenu="toggleMultiMenu"
            />
          </template>
        </li>
      </ul>
    </ScrollArea>
  </div>
</template>
