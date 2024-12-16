import "./Content.css";
import testimg from "./../assets/testimg.png";

import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import Button from "./Button";
import getParsedDate from "../utils/get-parsed-date";
import { DataDispatchContext } from "../App";

const Content = ({ id, img, content, date }) => {
  const { onDelete } = useContext(DataDispatchContext);
  const nav = useNavigate();
  const parsedDate = getParsedDate(date);

  const onClickDelete = () => {
    if (window.confirm("삭제하시겠습니까?")) {
      onDelete(id);
      nav("/", { replace: true });
    }
  };
  return (
    <div className="Content">
      <div className="content_img">
        <img src={img} />
      </div>
      <div className="content_btns">
        <Button
          name={"EDIT"}
          color={"white"}
          hoverColor={"blue"}
          onClick={() => {
            nav(`/edit/${id}`);
          }}
        />
        <Button name={"DELETE"} color={"white"} hoverColor={"red"} onClick={onClickDelete} />
      </div>
      <div className="content_date">{parsedDate}</div>
      <div className="content_body">{content}</div>
    </div>
  );
};

export default Content;
