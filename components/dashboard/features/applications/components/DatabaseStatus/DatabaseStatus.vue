<script setup lang="ts">
import Card from "@/components/ui/card/Card.vue";
import CardHeader from "@/components/ui/card/CardHeader.vue";
import CardTitle from "@/components/ui/card/CardTitle.vue";
import CardContent from "@/components/ui/card/CardContent.vue";
</script>

<template>
  <Card class="h-full">
    <CardHeader>
      <CardTitle>Database Status - Coming Soon</CardTitle>
    </CardHeader>
    <CardContent>
      <p class="text-muted-foreground">
        Database monitoring with connection pools, query performance, and I/O
        metrics will be displayed here.
      </p>
    </CardContent>
  </Card>
</template>
