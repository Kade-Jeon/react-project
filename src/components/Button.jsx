import "./Button.css";

import getIcon from "../utils/get-icon";

const Button = ({ name, onClick, color }) => {
  const icon = getIcon(name);

  return (
    <>
      <button
        className={`bg-${color}-500 hover:bg-blue-700 text-${
          color !== "white" ? "white" : "black"
        } font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition`}
        onClick={onClick}
      >
        <img src={icon} />
      </button>
    </>
  );
};

export default Button;