import "./Write.css";

import { useCallback, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../components/Header";
import Button from "../components/Button";
import Editor from "../components/Editor";
import { DataDispatchContext } from "../App";

const Write = () => {
  const nav = useNavigate();
  const [input, setInput] = useState();
  const { onCreate } = useContext(DataDispatchContext);

  const onSubmit = () => {
    onCreate(new Date().getTime().toString(), input.content, input.img);
    nav(-1, { replace: true });
  };

  const handleInput = useCallback((input) => {
    setInput(input);
  },[]);

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
        rightBtn={
          <Button 
            name={"SAVE"} 
            color={"blue"} 
            onClick={onSubmit}
            />
        }
      />
      <Editor onSubmit={onSubmit} handleInput={handleInput} />
    </div>
  );
};

export default Write;
