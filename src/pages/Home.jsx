import "./Home.css";

import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../components/Header";
import Button from "../components/Button";
import Content from "../components/Content";
import SelectOptions from "../components/SelectOptions";
import { DataStateContext } from "../App";

const optionsData = [
  { id : 1,
    value : "LATEST",
    display : "최신순",
  },
  { id : 2,
    value : "OLDEST",
    display : "오래된순",
  }
]

const Home = () => {
  const data = useContext(DataStateContext);
  const [order, setOrder] = useState("LATEST");
  const nav = useNavigate();
  const handleChangeOrder = (value) => {
    console.log(value);
    String(value) === "OLDEST" ? setOrder("OLDEST"): setOrder("LATEST");
  }

  const sortingData = () => {
    switch(order){
      case "OLDEST":
        return data.toSorted((a, b) => a.date - b.date);
      case "LATEST" :
        return data.toSorted((a, b) => b.date - a.date);
      default:
        return data;
    }
  }
  
  const sortedData = sortingData();

  return (
    <>
      <Header
        title={"InstaDiary"}
        leftBtn={<SelectOptions optionsData={optionsData} handleChangeOrder={handleChangeOrder}/>}
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
      {sortedData.map((item) => (
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
