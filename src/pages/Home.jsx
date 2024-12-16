import "./Home.css";

import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../components/Header";
import Button from "../components/Button";
import Content from "../components/Content";
import { DataStateContext } from "../App";

const Home = () => {
  const data = useContext(DataStateContext);
  const nav = useNavigate();
  return (
    <>
      <Header
        title={"InstaDiary"}
        rightBtn={
          <Button
            name={"WRITE"}
            color={"blue"}
            onClick={() => {
              nav("/write");
            }}
          />
        }
      />
      {data.map((item) => (
        <Content
          key={item.id}
          id={item.id}
          content={item.content}
          img={item.img}
          date={item.date}
        />
      ))}
    </>
  );
};

export default Home;
