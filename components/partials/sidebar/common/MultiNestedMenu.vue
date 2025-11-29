<script setup lang="ts">
import { cn, isLocationMatch } from "@/utils";
import { useRoute } from "#app";
import { computed } from "vue";
import Collapsible from "@/components/ui/collapsible/Collapsible.vue";
import CollapsibleContent from "@/components/ui/collapsible/CollapsibleContent.vue";

const props = defineProps<{
  subItem: any;
  subIndex: number;
  activeMultiMenu: number | null;
}>();

const route = useRoute();
const locationName = computed(() => route.path);
</script>

<template>
  <Collapsible :open="activeMultiMenu === subIndex">
    <CollapsibleContent class="CollapsibleContent">
      <ul class="space-y-3 pl-1">
        <li
          v-for="(item, i) in subItem?.multi_menu"
          :key="i"
          class="first:pt-3"
        >
          <NuxtLink :to="item.href">
            <span
              :class="
                cn(
                  'text-sm flex gap-3 items-center transition-all duration-150 capitalize hover:text-primary',
                  {
                    'text-primary': isLocationMatch(item.href, locationName),
                    'text-default-600': !isLocationMatch(
                      item.href,
                      locationName
                    ),
                  }
                )
              "
            >
              <span
                :class="
                  cn(
                    'inline-flex h-2 w-2 border border-default-500 rounded-full',
                    {
                      'bg-primary ring-primary/30 ring-[4px] border-primary':
                        isLocationMatch(item.href, locationName),
                    }
                  )
                "
              >
              </span>
              <span class="flex-1">{{ item.title }}</span>
            </span>
          </NuxtLink>
        </li>
      </ul>
    </CollapsibleContent>
  </Collapsible>
</template>
