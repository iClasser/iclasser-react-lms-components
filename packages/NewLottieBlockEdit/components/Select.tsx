const uniqid = function () {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};
interface SelectProps {
  data: { label: string; value: string; tickMark: boolean }[];
  small: boolean;
  onChange: (value: string) => void;
}
function Select(props: SelectProps) {
  const uniquKey = uniqid();
  const { data, small } = props;
  const py = small ? "py-1 px-1" : "py-3 px-4";

  return (
    <select
      onChange={(e) => (props.onChange ? props.onChange(e.target.value) : null)}
      className={`block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 ${py}
    pr-4 rounded leading-tight focus:outline-none focus:bg-white mb-1
    focus:border-gray-500 text-start`}
      id={uniquKey}
    >
      {data.map(({ label, value, tickMark }, n) => (
        <option value={value} selected={!!tickMark}>
          {label}
        </option>
      ))}
    </select>
  );
}

export default Select;
