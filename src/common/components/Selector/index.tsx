'use client';
import { FC, useState } from "react";

type OptionsT<T = string> = {
  label: string;
  value: T;
}

type SelectorProps<T = string> = {
  value: T;
  options: OptionsT<T>[];
  onChange: (value: T) => void;
  label?: string;
};

export const Selector: FC<SelectorProps> = ({ value, options, label, onChange }) => {
  const [selected, setSelected] = useState(value || options[0]?.value || "");

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelected(value);
    onChange(value);
  };

  return (
    <div className="w-full max-w-sm">
      {label && <label>{label}</label>}
      <select
        value={selected}
        onChange={handleChange}
        className="w-full p-2 border rounded-lg bg-white text-gray-700 focus:ring focus:ring-blue-300"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
