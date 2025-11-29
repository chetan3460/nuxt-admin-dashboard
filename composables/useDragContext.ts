import { inject } from "vue";

export const useDragContext = () => {
  const context = inject("dragContext");
  if (!context) {
    throw new Error("useDragContext must be used within a DragProvider");
  }
  return context;
};
