import useDrag from "../hooks/useDrag";
import CardForm from "./CardForm";
import Card from "./Card";
import { useState } from "react";

const DragList = ({ items, setItems, widthValue }) => {
  const [dragProps, dragStartHandler, dropHandler, draggedItem] = useDrag(
    items,
    setItems
  );

  const [pendingAddCard, setPendingAddCard] = useState({
    isPanding: false,
    cardId: null,
  });
  const [pendingDeleteCard, setPendingDeleteCard] = useState({
    isPanding: false,
    cardId: null,
  });

  return (
    <>
      {items
        .sort((a, b) => a.order - b.order)
        .map((item) => (
          <Card
            key={item.id}
            item={item}
            items={items}
            setItems={setItems}
            dragProps={dragProps}
            dragStartHandler={dragStartHandler}
            dropHandler={dropHandler}
            draggedItem={draggedItem}
            widthValue={widthValue}
            pendingAddCard={pendingAddCard}
            setPendingAddCard={setPendingAddCard}
            pendingDeleteCard={pendingDeleteCard}
            setPendingDeleteCard={setPendingDeleteCard}
          />
        ))}

      <CardForm
        items={items}
        setItems={setItems}
        widthValue={widthValue}
        setPendingAddCard={setPendingAddCard}
      />
    </>
  );
};

export default DragList;
