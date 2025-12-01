<script setup lang="ts">
import Card from "@/components/ui/card/Card.vue";
import CardHeader from "@/components/ui/card/CardHeader.vue";
import CardTitle from "@/components/ui/card/CardTitle.vue";
import CardContent from "@/components/ui/card/CardContent.vue";
</script>

<template>
  <Card class="h-full">
    <CardHeader>
      <CardTitle>Applications - Coming Soon</CardTitle>
    </CardHeader>
    <CardContent>
      <p class="text-muted-foreground">
        Applications overview table with status, version, and health metrics
        will be displayed here.
      </p>
    </CardContent>
  </Card>
</template>
