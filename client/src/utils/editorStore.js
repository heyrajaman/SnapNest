import { create } from "zustand";

const useEditorStore = create((set) => ({
  selectedLayer: "canvas",
  textOptions: {
    text: "",
    fontSize: 36,
    color: "#000000",
    top: 36,
    left: 0,
  },
  canvasOptions: {
    height: 0,
    orientation: "",
    size: "original",
    backgroundColor: "#E2725B",
  },
  setSelectedLayer: (newLayer) => set({ selectedLayer: newLayer }),
  setTextOptions: (newOptions) => set({ textOptions: newOptions }),
  addText: () =>
    set({
      textOptions: {
        text: "Add text",
        fontSize: 36,
        color: "#000000",
        top: 36,
        left: 0,
      },
    }),
  setCanvasOptions: (newOption) => set({ canvasOptions: newOption }),
  // FIXED: ADD RESET FUNCTION
  resetStore: () =>
    set({
      selectedLayer: "canvas",
      textOptions: {
        text: "",
        fontSize: 36,
        color: "#000000",
        top: 36,
        left: 0,
      },
      canvasOptions: {
        height: 0,
        orientation: "",
        size: "original",
        backgroundColor: "#E2725B",
      },
    }),
}));

export default useEditorStore;
