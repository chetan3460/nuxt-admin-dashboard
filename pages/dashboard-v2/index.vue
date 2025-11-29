<script setup lang="ts">
import { ref } from "vue";
import { useDragModeStore } from "@/stores/dragMode";
import TitleSection from "@/components/dashboard/ui/TitleSection.vue";
import CustomizeButton from "@/components/dashboard/ui/CustomizeButton.vue";
import AnalyticCards from "@/components/dashboard/features/analytics/AnalyticCards.vue";
import Tabs from "@/components/dashboard/ui/Tabs.vue";
import SMSVolume from "@/components/dashboard/features/sms-volume/SMSVolume.vue";
import ServiceProviders from "@/components/dashboard/features/service-providers/ServiceProviders.vue";
import SystemHealth from "@/components/dashboard/features/system-health/SystemHealth.vue";
import Applications from "@/components/dashboard/features/applications/Applications.vue";

definePageMeta({
  layout: "default",
});

const dragModeStore = useDragModeStore();

const tabs = [
  "SMS volume",
  "Service providers",
  "System health",
  "Applications",
];
const activeTab = ref("SMS volume");

const setActiveTab = (tab: string) => {
  activeTab.value = tab;
};
</script>

<template>
  <div class="space-y-6 p-6">
    <div class="flex items-center justify-between gap-4">
      <TitleSection />
      <CustomizeButton />
    </div>

    <!-- Analytics cards row -->
    <AnalyticCards />

    <!-- Tabs -->
    <Tabs :tabs="tabs" :activeTab="activeTab" @tabClick="setActiveTab" />

    <!-- Tab Content -->
    <div class="grid gap-5" role="tabpanel" aria-label="Dashboard V2 tabs">
      <SMSVolume v-if="activeTab === 'SMS volume'" />
      <ServiceProviders v-else-if="activeTab === 'Service providers'" />
      <SystemHealth v-else-if="activeTab === 'System health'" />
      <Applications v-else-if="activeTab === 'Applications'" />
    </div>
  </div>
</template>
