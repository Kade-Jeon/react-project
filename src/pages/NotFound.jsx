import "./NotFound.css";
import { useNavigate } from "react-router-dom";

import Button from "../components/Button";

const NotFound = () => {
  const nav = useNavigate();
  return (
    <div className="NotFound">
      <div className="flex items-center justify-center h-screen">
        <div className="bg-white p-8 rounded-lg text-center">
          <h1 className="text-3xl font-bold mb-4">Not Found</h1>
          <p className="text-gray-700">페이지가 없습니다.</p>
          <br />
          <Button
            name={"뒤로가기"}
            onClick={() => {
              nav(-1);
            }}
            color={"blue"}
          />
        </div>
      </div>
    </div>
  );
};

export default NotFound;
