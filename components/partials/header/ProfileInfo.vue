<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { onClickOutside } from "@vueuse/core";
import avatarSrc from "@/assets/images/avatar-1.jpg?url";

const user = {
  name: "John Doe",
  email: "john@example.com",
  image: avatarSrc,
};

const open = ref(false);
const dropdownRef = ref(null);

onClickOutside(dropdownRef, () => {
  open.value = false;
});

const menuItems = [
  { name: "Profile", icon: "heroicons:user" },
  { name: "Billing", icon: "heroicons:credit-card" },
  { name: "Settings", icon: "heroicons:cog-6-tooth" },
  { name: "Keyboard Shortcuts", icon: "heroicons:command-line" },
];
</script>

<template>
  <div class="relative inline-block text-left" ref="dropdownRef">
    <!-- Trigger -->
    <button
      @click="open = !open"
      class="flex items-center cursor-pointer focus:outline-none"
    >
      <img
        :src="user.image"
        :alt="user.name"
        width="36"
        height="36"
        class="rounded-full"
      />
    </button>

    <!-- Dropdown -->
    <div
      v-if="open"
      class="absolute right-0 mt-2 w-56 bg-white dark:bg-default-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-20"
    >
      <!-- User Info -->
      <div
        class="flex items-center gap-2 px-3 py-3 border-b border-gray-200 dark:border-default-200"
      >
        <img
          :src="user.image"
          :alt="user.name"
          width="36"
          height="36"
          class="rounded-full"
        />
        <div>
          <div class="text-sm font-medium text-default-800 capitalize">
            {{ user.name }}
          </div>
          <NuxtLink
            to="/dashboard"
            class="text-xs text-default-600 hover:text-primary"
          >
            @{{ user.email.split("@")[0] }}
          </NuxtLink>
        </div>
      </div>

      <!-- Menu Items -->
      <div class="py-1">
        <NuxtLink
          v-for="(item, index) in menuItems"
          :key="index"
          to="/dashboard"
        >
          <div
            class="flex items-center gap-2 px-3 py-2 text-sm font-medium text-default-600 capitalize hover:bg-gray-100 dark:hover:bg-default-200 cursor-pointer"
          >
            <Icon :icon="item.icon" class="w-4 h-4" />
            {{ item.name }}
          </div>
        </NuxtLink>
      </div>

      <div class="border-t border-gray-200 dark:border-default-200 py-1">
        <NuxtLink to="/dashboard">
          <div
            class="flex items-center gap-2 px-3 py-2 text-sm font-medium text-default-600 capitalize hover:bg-gray-100 dark:hover:bg-default-200 cursor-pointer"
          >
            <Icon icon="heroicons:cog-6-tooth" class="w-4 h-4" />
            Preferences
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
