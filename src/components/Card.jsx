import { IconDelete } from "./Icons";
import { useState } from "react";
import PopupCardInfo from "./PopupCardInfo";
import ChildCard from "./ChildCard";

const Card = ({
  items,
  setItems,
  item,
  dragProps,
  dragStartHandler,
  dropHandler,
  draggedItem,
  widthValue,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editTitle, setEditTitle] = useState({ isEdit: false, id: null });
  const [editDescription, setEditDescription] = useState({
    isEdit: false,
    id: null,
  });
  const [modalCard, setModalCard] = useState({ isShow: false, props: null });

  const deleteCard = (id) => {
    setItems(
      items
        .filter((card) => card.id !== id)
        .map((card, i) => ({ ...card, order: i + 1 }))
    );
  };

  return (
    <>
      <div
        id={item.id}
        className={`card relative bg-pink-200 p-7 rounded-md drop-shadow-lg h-40 overflow-y-auto group/item cursor-grab transition-transform duration-300`}
        style={{ flex: `0 0 calc(100% / ${widthValue} - 12px)` }}
        {...dragProps}
        onDragStart={(e) => dragStartHandler(e, item)}
        onDrop={(e) => dropHandler(e, item)}
      >
        {editTitle.isEdit && editTitle.id === item.id ? (
          <input
            className="bg-transparent outline-none mb-2 font-semibold"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            autoFocus={true}
            onBlur={() => {
              setEditTitle({ isEdit: false, id: null });
              setItems((arr) =>
                arr.map((card) =>
                  card.id === item.id ? { ...card, title } : card
                )
              );
            }}
          />
        ) : (
          <h4
            className="cursor-text mb-2 font-semibold"
            onDoubleClick={() => {
              setEditTitle({ isEdit: true, id: item.id });
              setTitle(item.title);
            }}
          >
            {item.title ? item.title : "Введите Заголовок"}
          </h4>
        )}

        {editDescription.isEdit && editDescription.id === item.id ? (
          <input
            className="bg-transparent outline-none mb-4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            type="text"
            autoFocus={true}
            onBlur={() => {
              setEditDescription({ isEdit: false, id: null });
              setItems((arr) =>
                arr.map((card) =>
                  card.id === item.id ? { ...card, description } : card
                )
              );
            }}
          />
        ) : (
          <p
            className="cursor-text mb-4"
            onDoubleClick={() => {
              setEditDescription({ isEdit: true, id: item.id });
              setDescription(item.description);
            }}
          >
            {item.description ? item.description : "Введите Описание"}
          </p>
        )}
        <div className={`flex flex-wrap gap-2`}>
          {item.children?.map((child, i) => (
            <ChildCard
              key={i}
              child={child}
              item={item}
              items={items}
              setItems={setItems}
              modalCard={modalCard}
              setModalCard={setModalCard}
            />
          ))}
        </div>

        <button
          className={`${
            draggedItem?.id === item.id ? "hidden" : "absolute"
          } flex items-center justify-center hover:drop-shadow-md p-1 w-8 h-8 rounded-full top-1 right-1 group/edit invisible hover:bg-pink-300 group-hover/item:visible`}
          onClick={() => deleteCard(item.id)}
        >
          <IconDelete />
        </button>
      </div>

      <PopupCardInfo modalCard={modalCard} />
    </>
  );
};

export default Card;
