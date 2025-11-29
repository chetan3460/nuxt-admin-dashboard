<script setup lang="ts">
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-[8px] border py-1 px-2 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 capitalize",
  {
    variants: {
      color: {
        default: "border-transparent bg-primary-50 text-primary-foreground",
        destructive:
          "bg-destructive-700/20 text-destructive-700 border-transparent",
        success: "bg-success-700/20 border-transparent text-success-700 ",
        info: "bg-info border-transparent text-info-foreground",
        warning: "bg-warning border-transparent text-warning-foreground",
        secondary: "bg-secondary border-transparent text-foreground",
        dark: "bg-accent-foreground border-transparent text-accent",
        live: "bg-primary-50 border-transparent text-indigo-600",
      },
      variant: {
        outline: "border border-current bg-background",
        soft: "text-current bg-opacity-10 hover:text-primary-foreground",
      },
    },
    compoundVariants: [
      {
        variant: "outline",
        color: "destructive",
        class: "text-destructive",
      },
      {
        variant: "outline",
        color: "success",
        class: "text-success",
      },
      {
        variant: "outline",
        color: "info",
        class: "text-info",
      },
      {
        variant: "outline",
        color: "warning",
        class: "text-warning",
      },
      {
        variant: "outline",
        color: "dark",
        class: "text-accent-foreground",
      },
      {
        variant: "outline",
        color: "secondary",
        class: "text-muted-foreground dark:bg-transparent border-default-500",
      },
      {
        variant: "outline",
        color: "default",
        class: "text-primary",
      },
      {
        variant: "outline",
        color: "live",
        class: "text-indigo-600",
      },
      // soft button variant
      {
        variant: "soft",
        color: "info",
        class: "text-info hover:text-info",
      },
      {
        variant: "soft",
        color: "warning",
        class: "text-warning hover:text-warning",
      },
      {
        variant: "soft",
        color: "destructive",
        class: "text-destructive hover:text-destructive",
      },
      {
        variant: "soft",
        color: "success",
        class: "text-success hover:text-success",
      },
      {
        variant: "soft",
        color: "secondary",
        class:
          "text-muted-foreground hover:text-muted-foreground !bg-opacity-50 ",
      },
      {
        variant: "soft",
        color: "default",
        class: "text-primary hover:text-primary",
      },
    ],
    defaultVariants: {
      color: "default",
    },
  }
);

interface Props {
  variant?: VariantProps<typeof badgeVariants>["variant"];
  color?: VariantProps<typeof badgeVariants>["color"];
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  color: "default",
});
</script>

<template>
  <div :class="cn(badgeVariants({ color, variant }), props.class)">
    <!-- Live dot indicator -->
    <span
      v-if="color === 'live'"
      class="mr-1 inline-block w-[6px] h-[6px] rounded-full bg-primary capitalize"
    />
    <slot />
  </div>
</template>
