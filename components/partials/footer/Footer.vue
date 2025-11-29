<script setup lang="ts">
import { useSidebarStore } from "@/stores/sidebar";
import { cn } from "@/utils";
import FooterLayout from "./FooterLayout.vue";

const sidebarStore = useSidebarStore();
const { collapsed } = storeToRefs(sidebarStore);

const layout = "vertical";
const footerType = "static";
</script>

<template>
  <FooterLayout
    :class="
      cn('', {
        'xl:ml-[244px]': !collapsed,
        'xl:ml-[72px]': collapsed,
        'sticky bottom-0': footerType === 'sticky',
      })
    "
  >
    <div class="block md:flex md:justify-between text-muted-foreground">
      <p class="sm:mb-0 text-xs md:text-sm">
        COPYRIGHT © {{ new Date().getFullYear() }} Equence All rights Reserved
      </p>
      <p class="mb-0 text-xs md:text-sm">
        Design by
        <a class="text-primary" target="__blank" href="https://screenroot.com/">
          Screenroot
        </a>
      </p>
    </div>
  </FooterLayout>
</template>
