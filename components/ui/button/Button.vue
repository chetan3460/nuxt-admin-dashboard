<script setup lang="ts">
import { Primitive, type PrimitiveProps } from "radix-vue";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-1 rounded-md text-sm font-normal ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-0 disabled:opacity-50 whitespace-nowrap disabled:pointer-events-none",
  {
    variants: {
      color: {
        default: "bg-primary text-primary-foreground hover:bg-primary/80",
        primary: "bg-primary text-primary-foreground hover:bg-primary/80",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/80",
        success: "bg-success text-success-foreground hover:bg-success/80",
        info: "bg-info text-info-foreground hover:bg-info/80",
        warning: "bg-warning text-warning-foreground hover:bg-warning/80",
        secondary: "bg-secondary text-muted-foreground dark:text-default-950",
        dark: "bg-accent-foreground text-accent hover:bg-accent-foreground/80",
      },
      variant: {
        outline: "border border-current rounded-[4px] bg-transparent",
        soft: "bg-opacity-10 hover:text-primary-foreground",
        ghost: "bg-transparent text-current hover:text-primary-foreground",
      },
      size: {
        default: "h-10 px-4 py-[10px]",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-[18px] py-[10px] text-base",
        xl: "h-12 rounded-md px-6 py-3 text-base",
        md: "h-9 rounded-md px-4 py-2",
        xs: "rounded-[4px] px-2 py-1 text-[12px] leading-[19px] tracking-[0.24px]",
        icon: "h-10 w-10",
      },
    },
    compoundVariants: [
      {
        variant: "outline",
        color: "destructive",
        class:
          "text-destructive hover:text-destructive-foreground hover:border-destructive hover:bg-destructive",
      },
      {
        variant: "outline",
        color: "success",
        class:
          "text-success hover:text-success-foreground hover:border-success hover:bg-success",
      },
      {
        variant: "outline",
        color: "info",
        class:
          "text-info hover:text-info-foreground hover:border-info hover:bg-info",
      },
      {
        variant: "outline",
        color: "warning",
        class:
          "text-warning hover:text-warning-foreground hover:border-warning hover:bg-warning",
      },
      {
        variant: "outline",
        color: "dark",
        class: "text-accent-foreground hover:bg-accent-foreground",
      },
      {
        variant: "outline",
        color: "secondary",
        class:
          "text-default-900  font-normal   border-[#E0E0E0] dark:border-[#5C5C5C] rounded-[4px]",
      },
      {
        variant: "outline",
        color: "default",
        class:
          "text-primary hover:text-primary-foreground hover:border-primary hover:bg-primary",
      },
      {
        variant: "outline",
        color: "primary",
        class: "text-default-900 ",
      },
      {
        variant: "soft",
        color: "info",
        class: "text-info hover:text-info-foreground",
      },
      {
        variant: "soft",
        color: "warning",
        class: "text-warning hover:text-warning-foreground",
      },
      {
        variant: "soft",
        color: "destructive",
        class: "text-destructive hover:text-destructive-foreground",
      },
      {
        variant: "soft",
        color: "success",
        class: "text-success hover:text-success-foreground",
      },
      {
        variant: "soft",
        color: "secondary",
        class:
          "text-muted-foreground dark:bg-opacity-50 hover:bg-default-500/50 dark:hover:bg-opacity-100",
      },
      {
        variant: "soft",
        color: "default",
        class: "text-primary",
      },
      {
        variant: "ghost",
        color: "default",
        class: "text-primary",
      },
      {
        variant: "ghost",
        color: "secondary",
        class:
          "text-muted-foreground dark:bg-transparent hover:bg-default-500/50 dark:hover:bg-default-500/50",
      },
      {
        variant: "ghost",
        color: "success",
        class: "text-success hover:text-success-foreground",
      },
      {
        variant: "ghost",
        color: "info",
        class: "text-info hover:text-info-foreground",
      },
      {
        variant: "ghost",
        color: "warning",
        class: "text-warning hover:text-warning-foreground",
      },
      {
        variant: "ghost",
        color: "destructive",
        class: "text-destructive hover:text-destructive-foreground",
      },
    ],
    defaultVariants: {
      color: "default",
      size: "default",
    },
  }
);

interface Props extends PrimitiveProps {
  variant?: VariantProps<typeof buttonVariants>["variant"];
  size?: VariantProps<typeof buttonVariants>["size"];
  color?: VariantProps<typeof buttonVariants>["color"];
  as?: string | object;
}

const props = withDefaults(defineProps<Props>(), {
  as: "button",
  color: "default",
  size: "default",
});
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    :class="cn(buttonVariants({ variant, size, color }), $attrs.class ?? '')"
  >
    <slot />
  </Primitive>
</template>
