<script setup lang="ts">
import { onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { siteConfig } from "@/config/site";
import { useSidebarStore } from "@/stores/sidebar";
import { cn } from "@/utils";
import Sidebar from "@/components/partials/sidebar/Sidebar.vue";
import MainHeader from "@/components/partials/header/MainHeader.vue";
import Footer from "@/components/partials/footer/Footer.vue";
import DragProvider from "@/components/draggable/DragProvider.vue";

const sidebarStore = useSidebarStore();
const { collapsed } = storeToRefs(sidebarStore);

const route = useRoute();

const applyBodyClasses = () => {
  if (process.client) {
    const body = document.body;
    if (route.path === "/") {
      // Home page: remove theme-custom class and radius
      body.className = cn(
        "dash-tail-app",
        body.className.replace(/theme-custom/g, "").trim()
      );
      body.style.removeProperty("--radius");
    } else {
      // Other pages: add theme-custom and radius from siteConfig
      body.className = cn("dash-tail-app theme-custom", body.className);
      body.style.setProperty("--radius", `${siteConfig.radius}rem`);
    }
  }
};

onMounted(() => {
  applyBodyClasses();
});

watch(
  () => route.path,
  () => {
    applyBodyClasses();
  }
);
</script>

<template>
  <div class="nexus-app min-h-screen">
    <DragProvider>
      <MainHeader />
      <Sidebar />
      <div
        :class="
          cn('content-wrapper transition-all duration-300', {
            'xl:ml-[244px]': !collapsed,
            'xl:ml-[72px]': collapsed,
          })
        "
      >
        <div class="p-6 page-min-height">
          <slot />
        </div>
      </div>
      <Footer />
    </DragProvider>
  </div>
</template>

<style scoped>
.page-min-height {
  min-height: calc(
    100vh - 64px - 60px
  ); /* Adjust based on header/footer height */
}
</style>
