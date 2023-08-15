import { useState } from "react";

const useInput = (initialValue, type) => {
  const [value, setValue] = useState(initialValue);
  return [
    {
      value,
      onChange: (e) => setValue(e.target.value),
      type,
    },
    () => setValue(initialValue),
  ];
};

export default useInput;
