import write from "../../public/write-white.png";
import save from "../../public/save-white.png";
import reset from "../../public/reset-white.png";

import trash from "../../public/delete-black.png";
import edit from "../../public/edit-black.png";
import back from "../../public/back-black.png";

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
