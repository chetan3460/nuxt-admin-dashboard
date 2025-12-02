export default defineNuxtPlugin((nuxtApp) => {
  // Register a dummy component on the server to prevent "Failed to resolve component" warnings
  nuxtApp.vueApp.component("apexchart", {
    render: () => null,
  });
});
