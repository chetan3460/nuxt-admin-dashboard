<script setup lang="ts">
import Card from "@/components/ui/card/Card.vue";
import CardHeader from "@/components/ui/card/CardHeader.vue";
import CardTitle from "@/components/ui/card/CardTitle.vue";
import CardContent from "@/components/ui/card/CardContent.vue";
</script>

<template>
  <div class="grid gap-4">
    <Card>
      <CardHeader>
        <CardTitle>Applications - Coming Soon</CardTitle>
      </CardHeader>
      <CardContent>
        <p class="text-muted-foreground mb-4">
          This section will include the following features:
        </p>
        <ul
          class="list-disc list-inside space-y-2 text-sm text-muted-foreground"
        >
          <li>Kafka Status Monitoring</li>
          <li>Database Status & Performance</li>
          <li>Redis Status & Metrics</li>
          <li>Webserver Status</li>
          <li>Applications Overview Table</li>
        </ul>
      </CardContent>
    </Card>
  </div>
</template>
