import React from "react";

// https://codesandbox.io/s/modern-bush-cj8rq?fontsize=14&hidenavigation=1&theme=dark&file=/src/App.js:1110-1129

export default function CheckBox(props) {
  return (
    <div>
      <ul>
        {props.options.map((option) => (
          <li key={option.id}>
            <label>
              <input
                className={props.className}
                name="test"
                checked={option.value === props.checked}
                onChange={() => props.onChange(option.value)}
                type="checkbox"
              />
              <span>{option.label}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}
