import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./App.css";
import useInput from "./hooks/useInput";
import DragList from "./components/DragList";
import { IconClose, IconColumns, IconSettings } from "./components/Icons";

function App() {
  const [cards, setCards] = useState([
    {
      id: uuidv4(),
      order: 1,
      title: "Заголовок 1",
      description: "Это 1 карта",
      children: [],
    },
    {
      id: uuidv4(),
      order: 2,
      title: "Заголовок 2",
      description: "Это 2 карта",
      children: [],
    },
    {
      id: uuidv4(),
      order: 3,
      title: "Заголовок 3",
      description: "Это 3 карта",
      children: [],
    },
    {
      id: uuidv4(),
      order: 4,
      title: "Заголовок 4",
      description: "Это 4 карта",
      children: [],
    },
    {
      id: uuidv4(),
      order: 5,
      title: "Заголовок 5",
      description: "Это 5 карта",
      children: [],
    },
    {
      id: uuidv4(),
      order: 6,
      title: "Заголовок 6",
      description: "Это 6 карта",
      children: [],
    },
  ]);

  const [widthProps] = useInput("6", "range");
  const [isActiveSettings, setIsActiveSettings] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsActiveSettings((val) => !val)}
        className="fixed bottom-4 right-4 bg-red-200 p-2 rounded-full text-red-800 z-50 shadow-round-sm hover:shadow-round-xl hover:rotate-90 duration-300"
      >
        <IconSettings size={40} />
      </button>

      <div
        className={`fixed px-5 py-24 bg-white h-screen w-72 top-0 ${
          isActiveSettings ? "right-0" : "-right-72"
        } transition-[right] duration-300 z-40 shadow-2xl`}
      >
        <input {...widthProps} min="2" max="12" />{" "}
        <div className="inline-flex gap-2 ml-2">
          {widthProps.value} <IconColumns size={24} />
        </div>
        <button
          onClick={() => setIsActiveSettings(false)}
          className="absolute top-5 left-5 p-2 bg-gray-100 shadow-md rounded-full text-red-900 hover:shadow-lg duration-300"
        >
          <IconClose size={24} />
        </button>
      </div>

      {isActiveSettings ? (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-half-transparent z-20"></div>
      ) : null}

      <div className="flex flex-wrap gap-3 w-full">
        <DragList
          items={cards}
          setItems={setCards}
          widthValue={widthProps.value}
        />
      </div>
    </>
  );
}

export default App;
