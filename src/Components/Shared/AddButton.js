import React from "react";

const AddButton = ({handleAddFields}) => {
  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={handleAddFields}
    >
      <rect
        x="0.469727"
        y="0.24408"
        width="35"
        height="35"
        rx="17.5"
        fill="#273142"
      />
      <path
        d="M12.0297 18.8481V16.5341H16.9437V11.9321H19.3357V16.5341H24.2497V18.8481H19.3357V23.4761H16.9437V18.8481H12.0297Z"
        fill="white"
      />
    </svg>
  );
};

export default AddButton;
