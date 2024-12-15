import write from "../assets/write-white.png";
import save from "../assets/save-white.png";
import reset from "../assets/reset-white.png";

import trash from "../assets/delete-black.png";
import edit from "../assets/edit-black.png";
import back from "../assets/back-black.png";


const getIcon = (name) => {
  switch (name) {
    case "WRITE":
      return write;
    case "DELETE":
      return trash;
    case "EDIT":
      return edit;
    case "BACK":
      return back;
    case "SAVE":
      return save;
    case "RESET":
      return reset;
  }
};

export default getIcon;
