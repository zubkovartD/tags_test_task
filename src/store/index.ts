import { create } from "zustand";
import { TagStoreState } from "../types";

export const useTagStore = create<TagStoreState>((set) => ({
  inputValue: "",
  setInputValue: (inputValue) => set({ inputValue }),
  selectedTags: [],
  setSelectedTags: (selectedTags) => set({ selectedTags }),
}));
