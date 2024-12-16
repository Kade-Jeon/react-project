import "./Edit.css";

import { useContext, useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Header from "../components/Header";
import Button from "../components/Button";
import Editor from "../components/Editor";
import { DataStateContext, DataDispatchContext } from "../App";

const Edit = () => {
  const params = useParams();
  const nav = useNavigate();
  const data = useContext(DataStateContext);
  const { onUpdate } = useContext(DataDispatchContext);
  const [selected, setSelected] = useState();
  const [input, setInput] = useState();

  useEffect(() => {
    if (!data) {
      return;
    }

    const selectedData = data.find(
      (item) => Number(item.id) === Number(params.id)
    );

    if (!selectedData) {
      return;
    }

    setSelected(selectedData);
  }, [params, data]);

  const onSubmit = () => {
    onUpdate(
      params.id,
      new Date().getTime().toString(),
      input.content,
      input.img
    );
    nav("/", { replace: true });
  };

  const handleInput = useCallback((input) => {
    setInput(input);
  },[]);

  return (
    <div>
      <Header
        title={"수정하기"}
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
      <Editor initData={selected} handleInput={handleInput} />
    </div>
  );
};

export default Edit;
