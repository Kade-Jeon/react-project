import "./Edit.css";

import { useContext, useEffect, useState } from "react";
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

  const onSubmit = (input) => {
    onUpdate(
      params.id,
      new Date().getTime().toString(),
      input.content,
      input.img
    );
    nav("/", { replace: true });
  };

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
      />
      <Editor initData={selected} onSubmit={onSubmit} />
    </div>
  );
};

export default Edit;
