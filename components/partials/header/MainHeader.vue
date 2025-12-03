<script setup lang="ts">
import { cn } from "@/utils";
import { useSidebarStore } from "@/stores/sidebar";
import { useMediaQuery } from "@vueuse/core";
import Header from "./Header.vue";
import VerticalHeader from "./VerticalHeader.vue";
import ThemeButton from "./ThemeButton.vue";
import ProfileInfo from "./ProfileInfo.vue";
import MobileMenuHandler from "./MobileMenuHandler.vue";

import CustomizeButton from "@/components/dashboard/ui/CustomizeButton.vue";
import NotificationMessage from "./NotificationMessage.vue";
import FullScreen from "./FullScreen.vue";

const props = defineProps<{
  handleOpenSearch?: () => void;
}>();

const sidebarStore = useSidebarStore();
const { collapsed, sidebarType } = storeToRefs(sidebarStore);

const navbarType = "sticky";
const isDesktop = useMediaQuery("(min-width: 1280px)");
</script>

<template>
  <Header
    :class="
      cn({
        'xl:ml-[244px]': !collapsed,
        'xl:ml-[72px]': collapsed,
        'sticky top-0': navbarType === 'sticky',
      })
    "
  >
    <div class="w-full bg-card md:px-6 px-[15px] py-3">
      <div class="flex justify-between items-center h-full">
        <VerticalHeader
          :sidebarType="sidebarType"
          :handleOpenSearch="handleOpenSearch"
        />
        <div class="nav-tools flex items-center gap-2 md:gap-6">
          <CustomizeButton />
          <NotificationMessage />
          <ClientOnly>
            <FullScreen v-if="isDesktop" />
          </ClientOnly>
          <ThemeButton />
          <div class="pl-2">
            <ProfileInfo />
          </div>
          <ClientOnly>
            <MobileMenuHandler v-if="!isDesktop" />
          </ClientOnly>
        </div>
      </div>
    </div>
  </Header>
</template>
