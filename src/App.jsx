import { useState } from "react";
import "./App.css";
import "./output.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
          <h1 className="text-3xl font-bold text-blue-500 mb-4">
            Welcome to Tailwind CSS!
          </h1>
          <p className="text-gray-700">
            Tailwind CSS는 유연하고 강력한 유틸리티 클래스 기반의 CSS
            프레임워크입니다.
          </p>
          <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
            Click Me
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
