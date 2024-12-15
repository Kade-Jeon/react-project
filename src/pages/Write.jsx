import "./Write.css";

import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../components/Header";
import Button from "../components/Button";
import Editor from "../components/Editor";
import { DataDispatchContext } from "../App";

const Write = () => {
  const nav = useNavigate();
  const { onCreate } = useContext(DataDispatchContext);

  const onSubmit = (input) => {
    onCreate(new Date().getTime().toString(), input.content, input.img);
    nav(-1, { replace: true });
  };

  return (
    <div>
      <Header
        title={"새 글 작성"}
        leftBtn={
          <Button
            name={"BACK"}
            color={"white"}
            onClick={() => {
              nav(-1);
            }}
          />
        }
      />
      <Editor onSubmit={onSubmit} />
    </div>
  );
};

export default Write;
