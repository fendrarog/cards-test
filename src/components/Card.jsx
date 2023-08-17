import { IconDelete } from "./Icons";
import { useEffect, useState } from "react";
import PopupCardInfo from "./PopupCardInfo";
import ChildCard from "./ChildCard";
import PopupWarning from "./PopupWarning";

const Card = ({
  items,
  setItems,
  item,
  dragProps,
  dragStartHandler,
  dropHandler,
  draggedItem,
  widthValue,
  pendingAddCard,
  setPendingAddCard,
  pendingDeleteCard,
  setPendingDeleteCard,
  pendingHidePopup,
  setPendingHidePopup,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editTitle, setEditTitle] = useState({ isEdit: false, id: null });
  const [editDescription, setEditDescription] = useState({
    isEdit: false,
    id: null,
  });
  const [popup, setPopup] = useState({ isShow: false, props: null });
  const [warning, setWarning] = useState({ isShow: false, props: null });

  const deleteCard = (e, id) => {
    if (!warning.isShow) {
      const containCard = items.find(
        (card) => card.id === id && card?.children.length > 0
      );
      const x = e.clientX;
      const y = e.clientY;
      console.log(containCard);
      if (containCard) {
        setWarning({ isShow: true, props: { ...containCard, x, y } });
        return;
      }
    }

    setPendingDeleteCard({ isPanding: true, cardId: id });
    setTimeout(() => {
      setItems(
        items
          .filter((card) => card.id !== id)
          .map((card, i) => ({ ...card, order: i + 1 }))
      );
      setPendingDeleteCard({
        isPanding: false,
        cardId: null,
      });
    }, 300);
  };

  useEffect(() => {
    if (popup.isShow) setPopup({ isShow: false, props: null });
    if (warning.isShow) setWarning({ isShow: false, props: null });
  }, [item.order]);

  return (
    <>
      <div
        id={item.id}
        className={`card ${
          pendingDeleteCard.isPanding &&
          pendingDeleteCard.cardId === item.id &&
          "animate-fliesin"
        } ${
          pendingAddCard.isPanding &&
          pendingAddCard.cardId === item.id &&
          "animate-fliesout"
        } relative bg-pink-200 rounded-md drop-shadow-lg h-40 group/item cursor-grab transition-transform duration-300`}
        style={{ flex: `0 0 calc(100% / ${widthValue} - 12px)` }}
        {...dragProps}
        onDragStart={(e) => dragStartHandler(e, item)}
        onDrop={(e) => dropHandler(e, item)}
      >
        <div className="inner-card absolute p-7 pt-9 overflow-y-auto h-full w-full">
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
                popup={popup}
                setPopup={setPopup}
                draggedItem={draggedItem}
                setPendingAddCard={setPendingAddCard}
                setPendingHidePopup={setPendingHidePopup}
              />
            ))}
          </div>
        </div>
        <button
          className={`${
            draggedItem?.id === item.id
              ? "duration-0 delay-0"
              : "duration-300 delay-150"
          } absolute flex items-center justify-center shadow-md hover:shadow-lg p-1 w-7 h-7 rounded-full top-2 right-2  scale-0 ${
            warning?.isShow
              ? "scale-100 bg-pink-400"
              : "group-hover/item:scale-100 bg-pink-300 hover:bg-pink-400"
          }`}
          onClick={(e) => deleteCard(e, item.id)}
          disabled={warning?.isShow}
        >
          {warning?.isShow ? (
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
          ) : null}
          <IconDelete />
        </button>
      </div>

      <PopupCardInfo
        popup={popup}
        draggedItem={draggedItem}
        pendingHidePopup={pendingHidePopup}
        setPendingHidePopup={setPendingHidePopup}
        item={item}
      />
      <PopupWarning
        warning={warning}
        setWarning={setWarning}
        draggedItem={draggedItem}
        deleteCard={deleteCard}
      />
    </>
  );
};

export default Card;
