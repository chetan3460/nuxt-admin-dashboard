<script setup lang="ts">
import { useSidebarStore } from "@/stores/sidebar";
import { cn } from "@/utils";
import { useMediaQuery } from "@vueuse/core";
import logoSrc from "@/assets/images/logo.svg?url";

const props = defineProps<{
  handleOpenSearch?: () => void;
}>();

const sidebarStore = useSidebarStore();
const { collapsed, subMenu, sidebarType } = storeToRefs(sidebarStore);
const { setCollapsed } = sidebarStore;

const layout = "vertical";
const isDesktop = useMediaQuery("(min-width: 1280px)");
const isMobile = useMediaQuery("(min-width: 768px)");

const toggleCollapsed = () => {
  setCollapsed(!collapsed.value);
};
</script>

<template>
  <div class="flex items-center md:gap-6 gap-3">
    <!-- Logo for mobile or semibox -->
    <NuxtLink
      v-if="(layout === 'semibox' || layout === 'vertical') && !isDesktop"
      to="/dashboard-v2"
      class="text-primary"
    >
      <img
        :src="logoSrc"
        alt="Logo"
        class="h-6 md:h-7 w-auto"
      />
    </NuxtLink>

    <!-- Menu Bar -->
    <button
      v-if="isDesktop && sidebarType !== 'classic' && !subMenu"
      class="relative group disabled:cursor-not-allowed opacity-50"
      @click="toggleCollapsed"
    >
      <div>
        <div
          :class="
            cn(
              'flex flex-col justify-between w-[20px] h-[16px] transform transition-all duration-300 origin-center overflow-hidden',
              {
                '-translate-x-1.5 rotate-180': collapsed,
              }
            )
          "
        >
          <div
            :class="
              cn(
                'bg-card-foreground h-[2px] transform transition-all duration-300 origin-left delay-150',
                {
                  'rotate-[42deg] w-[11px]': collapsed,
                  'w-7': !collapsed,
                }
              )
            "
          ></div>
          <div
            :class="
              cn(
                'bg-card-foreground h-[2px] w-7 rounded transform transition-all duration-300',
                {
                  'translate-x-10': collapsed,
                }
              )
            "
          ></div>
          <div
            :class="
              cn(
                'bg-card-foreground h-[2px] transform transition-all duration-300 origin-left delay-150',
                {
                  '-rotate-[43deg] w-[11px]': collapsed,
                  'w-7': !collapsed,
                }
              )
            "
          ></div>
        </div>
      </div>
    </button>

    <!-- Search Button -->
    <div>
      <button
        class="inline-flex gap-2 items-center text-[#595B61] text-sm"
        @click="handleOpenSearch"
      >
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="17"
            viewBox="0 0 16 17"
            fill="none"
          >
            <path
              d="M7.33333 13.1667C10.2789 13.1667 12.6667 10.7789 12.6667 7.83333C12.6667 4.88781 10.2789 2.5 7.33333 2.5C4.38781 2.5 2 4.88781 2 7.83333C2 10.7789 4.38781 13.1667 7.33333 13.1667Z"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M14.0001 14.5L11.1001 11.6"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </span>
        <span class="md:block hidden"> Search...</span>
      </button>
    </div>
  </div>
</template>
