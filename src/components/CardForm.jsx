import { v4 as uuidv4 } from "uuid";
import useInput from "../hooks/useInput";
import { IconAdd } from "./Icons";

const CardForm = ({ items, setItems, widthValue, setPendingAddCard }) => {
  const [titleProps, resetTitle] = useInput("", "text");
  const [descriptionProps, resetDescription] = useInput("", "text");

  const submit = (e) => {
    e.preventDefault();

    const newCard = {
      id: uuidv4(),
      order: items.length + 1,
      title: titleProps.value,
      description: descriptionProps.value,
      children: [],
    };

    setPendingAddCard({ isPanding: true, cardId: newCard.id });
    setTimeout(
      () => setPendingAddCard({ isPanding: false, cardId: null }),
      300
    );

    setItems([...items, { ...newCard }]);
    resetTitle();
    resetDescription();
  };

  return (
    <div
      className={`card relative bg-green-500 px-7 pt-7 pb-2 drop-shadow-lg rounded-md h-40 overflow-y-auto`}
      style={{ flex: `0 0 calc(100% / ${widthValue} - 12px)` }}
    >
      <form onSubmit={submit}>
        <input
          {...titleProps}
          placeholder="Add title..."
          required
          className="block mb-3 border-b bg-transparent text-zinc-50 placeholder:text-zinc-50 placeholder:font-normal outline-none"
        />
        <input
          {...descriptionProps}
          placeholder="Add description..."
          required
          className="block mb-3 border-b bg-transparent text-zinc-50 placeholder:text-zinc-50 outline-none"
        />

        <button className="bg-green-600 p-1 rounded-full text-zinc-50 hover:rotate-90 duration-300">
          <IconAdd size={40} />
        </button>
      </form>
    </div>
  );
};

export default CardForm;
