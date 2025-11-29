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
        <CardTitle>Service Providers - Coming Soon</CardTitle>
      </CardHeader>
      <CardContent>
        <p class="text-muted-foreground mb-4">
          This section will include the following features:
        </p>
        <ul
          class="list-disc list-inside space-y-2 text-sm text-muted-foreground"
        >
          <li>Provider Status Overview</li>
          <li>Provider Traffic Analytics</li>
          <li>API Calls Today</li>
          <li>API Calls by Provider (Bar Chart)</li>
          <li>Ongoing TPS Monitoring</li>
          <li>Average Latency Metrics</li>
          <li>Delivery Reports</li>
          <li>Successful Transactions</li>
        </ul>
      </CardContent>
    </Card>
  </div>
</template>
