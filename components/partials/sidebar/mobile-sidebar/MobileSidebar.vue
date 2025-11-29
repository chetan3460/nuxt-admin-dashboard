<script setup lang="ts">
import { cn, isLocationMatch } from "@/utils";
import { useSidebarStore } from "@/stores/sidebar";
import SidebarLogo from "../common/Logo.vue";
import { menusConfig } from "@/config/menus";
import MenuLabel from "../common/MenuLabel.vue";
import ScrollArea from "@/components/ui/scroll-area/ScrollArea.vue";
import SingleMenuItem from "../classic/SingleMenuItem.vue";
import SubMenuHandler from "../classic/SubMenuHandler.vue";
import NestedSubMenu from "../common/NestedSubMenu.vue";

const props = defineProps<{
  className?: string;
}>();

const sidebarStore = useSidebarStore();
const { collapsed, sidebarBg, mobileMenu } = storeToRefs(sidebarStore);
const { setMobileMenu } = sidebarStore;

const activeSubmenu = ref<number | null>(null);
const activeMultiMenu = ref<number | null>(null);
const menus = menusConfig?.sidebarNav?.classic || [];

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
    if (mobileMenu.value) {
      setMobileMenu(false);
    }
  },
  { immediate: true }
);
</script>

<template>
  <div>
    <div
      :class="
        cn('fixed top-0 bg-card h-full w-[248px] z-[9999]', props.className, {
          ' -left-[300px] invisible opacity-0': !mobileMenu,
          ' left-0 visible opacity-100': mobileMenu,
        })
      "
    >
      <div
        v-if="sidebarBg !== 'none'"
        class="absolute left-0 top-0 z-[-1] w-full h-full bg-cover bg-center opacity-[0.07]"
        :style="{ backgroundImage: `url(${sidebarBg})` }"
      ></div>
      <SidebarLogo :collapsed="collapsed" />
      <ScrollArea
        :class="
          cn('sidebar-menu h-[calc(100%-80px)]', {
            'px-4': !collapsed,
          })
        "
      >
        <ul
          :class="
            cn('', {
              'space-y-2 text-center': collapsed,
            })
          "
        >
          <li v-for="(item, i) in menus" :key="`menu_key_${i}`">
            <!-- single menu -->
            <SingleMenuItem
              v-if="!item.child && !item.isHeader"
              :item="item"
              :collapsed="collapsed"
            />

            <!-- menu label -->
            <MenuLabel
              v-if="item.isHeader && !item.child && !collapsed"
              :item="item"
            />

            <!-- sub menu -->
            <template v-if="item.child">
              <SubMenuHandler
                :item="item"
                :index="i"
                :activeSubmenu="activeSubmenu"
                :collapsed="collapsed"
                @toggleSubmenu="toggleSubmenu"
              />

              <NestedSubMenu
                v-if="!collapsed"
                :activeSubmenu="activeSubmenu"
                :item="item"
                :index="i"
                :activeMultiMenu="activeMultiMenu"
                :collapsed="collapsed"
                @toggleMultiMenu="toggleMultiMenu"
              />
            </template>
          </li>
        </ul>
      </ScrollArea>
    </div>
    <div
      v-if="mobileMenu"
      @click="setMobileMenu(false)"
      class="overlay bg-black/60 backdrop-filter backdrop-blur-sm opacity-100 fixed inset-0 z-[999]"
    ></div>
  </div>
</template>
