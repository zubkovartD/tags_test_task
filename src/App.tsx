import { useQuery } from "react-query";
import Select from "react-select";
import { Option } from "./types";
import { useTagStore } from "./store";
import CustomOption from "./CustomOption";
import { fetchOptions } from "./api";

function App() {
  const { inputValue, setInputValue, selectedTags, setSelectedTags } =
    useTagStore();
  const { data: options } = useQuery("options", fetchOptions);

  const handleDoubleClickTag = (tag: Option) => {
    const index = selectedTags.findIndex((t: Option) => t.value === tag.value);
    const newSelectedTags = [...selectedTags];

    if (index !== -1) {
      newSelectedTags[index] = {
        ...newSelectedTags[index],
        isEditing: true,
      };
      setInputValue(newSelectedTags[index].label);
      setSelectedTags(newSelectedTags);
    }
  };

  const handleSaveEdit = (tag: Option) => {
    const index = selectedTags.findIndex((t: Option) => t.value === tag.value);
    const newSelectedTags = [...selectedTags];

    if (index !== -1) {
      newSelectedTags[index] = {
        ...newSelectedTags[index],
        label: inputValue,
        isEditing: false,
      };
      setInputValue("");
      setSelectedTags(newSelectedTags);
    }
  };

  const handleCancelEdit = (tag: Option) => {
    const index = selectedTags.findIndex((t: Option) => t.value === tag.value);
    const newSelectedTags = [...selectedTags];

    if (index !== -1) {
      newSelectedTags[index] = {
        ...newSelectedTags[index],
        isEditing: false,
      };
      setInputValue("");
      setSelectedTags(newSelectedTags);
    }
  };

  return (
    <div>
      <Select
        isSearchable
        isMulti
        isClearable
        closeMenuOnSelect={false}
        options={options}
        value={selectedTags || []}
        onChange={(selectedOption) => {
          setSelectedTags(selectedOption as Option[]);
        }}
        components={{
          Option: CustomOption,
        }}
        inputValue={inputValue}
        onInputChange={(input) => setInputValue(input)}
      />
      <div>
        <p>Double click to edit specific tag 👇</p>
        {selectedTags.map((tag: Option) => (
          <div key={tag.value} onDoubleClick={() => handleDoubleClickTag(tag)}>
            {tag.isEditing ? (
              <div>
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onBlur={() => handleSaveEdit(tag)}
                />
                <button onClick={() => handleSaveEdit(tag)}>Save</button>
                <button onClick={() => handleCancelEdit(tag)}>Cancel</button>
              </div>
            ) : (
              <div>{tag.label}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
