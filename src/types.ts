export interface Option {
  label: string;
  value: string;
  category: string;
  id: string;
  isEditing?: boolean;
}

export interface TagStoreState {
  inputValue: string;
  setInputValue: (inputValue: string) => void;
  selectedTags: Option[];
  setSelectedTags: (selectedTags: Option[]) => void;
}
