import "./App.css";
import "./global.css";

import { useState, createContext, useReducer, useRef, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { openDatabase, getAllData, saveData, updateDataById, deleteDataById } from "./utils/use-indexed-db";

import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Edit from "./pages/Edit";
import Write from "./pages/Write";

// const mockData = [
//   {
//     id: 1,
//     date: new Date("2024-12-14 23:33:33").getTime().toString(),
//     img: "testimg",
//     content: "1내용이 잘 나오나요",
//   },
//   {
//     id: 2,
//     date: new Date().getTime().toString(),
//     img: "testimg",
//     content: "2내용이 잘 나오나요",
//   },
// ];

export const DataStateContext = createContext();
export const DataDispatchContext = createContext();

const reducer = (state, action) => {
  let newState;
  switch (action.type) {
    case "INIT":
      newState = action.data;
      break;
    case "CREATE":
      newState = [action.data, ...state];
      saveData(action.data);
      break;
    case "UPDATE":
      newState = state.map((item) =>
        Number(item.id) === Number(action.data.id) ? action.data : item
      );
      updateDataById(action.data);
      break;
    case "DELETE":
      newState = state.filter((item) => Number(item.id) !== Number(action.id));
      deleteDataById(action.id);
      break;
    default:
      return state;
  }
  return newState;
};

function App() {
  const [data, dispatch] = useReducer(reducer, []);
  const idRef = useRef(1);

  useEffect(() => {
    openDatabase();
    const fetchData = async () => {
      try {
        const storedData = await getAllData();
        if (storedData) {
          dispatch({
            type: "INIT",
            data: storedData,
          });
        }
        const highestId = Math.max(...storedData.map((item) => item.id));
        if (highestId !== -Infinity) {
          idRef.current = highestId;
        }

      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  const onCreate = (date, content, img) => {
    dispatch({
      type: "CREATE",
      data: {
        id: idRef.current++,
        date: date,
        content: content,
        img: img,
      },
    });
  };

  const onDelete = (id) => {
    dispatch({
      type: "DELETE",
      id: id,
    });
  };

  const onUpdate = (id, date, content, img) => {
    dispatch({
      type: "UPDATE",
      data: {
        id: id,
        date: date,
        content: content,
        img: img,
      },
    });
  };

  return (
    <>
      <DataStateContext.Provider value={data}>
        <DataDispatchContext.Provider value={{ onCreate, onDelete, onUpdate }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/edit/:id" element={<Edit />} />
            <Route path="/write" element={<Write />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </DataDispatchContext.Provider>
      </DataStateContext.Provider>
    </>
  );
}

export default App;
