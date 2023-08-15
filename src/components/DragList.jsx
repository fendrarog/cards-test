import useDrag from "../hooks/useDrag";
import CardForm from "./CardForm";
import Card from "./Card";

const DragList = ({ items, setItems, widthValue }) => {
  const [dragProps, dragStartHandler, dropHandler, draggedItem] = useDrag(
    items,
    setItems
  );

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
          />
        ))}

      <CardForm items={items} setItems={setItems} widthValue={widthValue} />
    </>
  );
};

export default DragList;
