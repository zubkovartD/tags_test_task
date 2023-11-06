import { Option } from "./types";

export const fetchOptions = async (): Promise<Option[]> => {
  const response = await fetch(
    "https://652f91320b8d8ddac0b2b62b.mockapi.io/autocomplete"
  );
  if (!response.ok) {
    throw new Error("Failed to fetch options");
  }
  const data: Option[] = await response.json();
  return data.map((option: Option) => ({
    label: option.name,
    value: option.value,
    category: option.category,
    id: option.id,
  }));
};
