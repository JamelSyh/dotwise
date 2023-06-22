import React from "react";
export interface RadioProps {
  name: string;
  label?: string;
  id: string;
}
const Radio: React.FC<RadioProps> = ({ name, label, id }) => {
  return (
    <div className="flex items-center mt-3">
      <input
        id={id}
        name={name}
        type="radio"
        className="focus:ring-action-primary h-8 w-8 text-action-primary border-primary"
      />
      {label && (
        <label
          htmlFor={id}
          className="ml-3 block text-paragraph-small text-black dark:text-white"
        >
          {label}
        </label>
      )}
    </div>
  );
};

export default Radio;
