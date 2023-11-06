import { OptionProps } from "react-select";
import { Option } from "./types";

const CustomOption: React.FC<OptionProps<Option>> = ({
  innerProps,
  label,
  data,
}) => (
  <div {...innerProps}>
    <div>{label}</div>
    <div style={{ fontSize: 12, color: "gray" }}>{data.category}</div>
  </div>
);

export default CustomOption;
