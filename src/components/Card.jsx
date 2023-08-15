import { IconDelete, IconHide, IconShow, IconUpload } from "./Icons";
import { useState } from "react";
import PopupCardInfo from "./PopupCardInfo";

const Card = ({
  items,
  setItems,
  item,
  dragProps,
  dragStartHandler,
  dropHandler,
  draggedItem,
  widthValue
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editTitle, setEditTitle] = useState({ isEdit: false, id: null });
  const [editDescription, setEditDescription] = useState({
    isEdit: false,
    id: null,
  });

  const [modalCard, setModalCard] = useState({ isShow: false, props: null });

  const handleChildUpload = (e, item, child) => {
    const processedChildren = item.children.filter((el) => el.id !== child.id);
    const cards = [...items, { ...child, order: items.length + 1 }];
    const processedCards = cards.map((el) =>
      el.id === item.id ? { ...el, children: processedChildren } : { ...el }
    );
    setItems(processedCards);
  };

  const handleClickChild = (e, child) => {
    setModalCard({
      isShow: true,
      props: { ...child, x: e.clientX, y: e.clientY },
    });
  };

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
            <div
              key={i}
              className="bg-red-300 drop-shadow-md p-2 flex items-center gap-2 rounded-md"
            >
              <h4 className="truncate w-20 max-w-full">{child.title}</h4>
              <button
                onClick={(e) =>
                  modalCard.isShow
                    ? setModalCard({ isShow: false, props: null })
                    : handleClickChild(e, child)
                }
                disabled={modalCard.isShow && child.id !== modalCard.props.id}
                className="flex items-center justify-center disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer p-1 rounded-full hover:drop-shadow-md hover:bg-red-400"
              >
                {modalCard?.props?.id === child.id ? (
                  <IconHide />
                ) : (
                  <IconShow />
                )}
              </button>
              <button
                onClick={(e) => handleChildUpload(e, item, child)}
                disabled={modalCard.isShow}
                className="flex items-center justify-center disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer p-1 rounded-full hover:drop-shadow-md hover:bg-red-400"
              >
                <IconUpload />
              </button>
            </div>
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
