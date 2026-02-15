import { create } from "zustand";

interface InventoryState {
  items: Record<string, number>;
  increase: (item: string) => void;
  decrease: (item: string) => void;
}

export const useStore = create<InventoryState>((set) => ({
  items: {
    tv: 40,
    mobile: 60,
    "computer-tables": 20,
    "dining-tables": 15,
    programming: 100,
    "ai-data-science": 50,
    "story-books": 80,
    "activity-books": 70,
  },

  increase: (item) =>
    set((state) => ({
      items: {
        ...state.items,
        [item]: state.items[item] + 1,
      },
    })),

  decrease: (item) =>
    set((state) => ({
      items: {
        ...state.items,
        [item]: state.items[item] - 1,
      },
    })),
}));
