import { useEffect, useRef, useState } from "react";

const useDrag = (items, setItems) => {
  const [draggedItem, setDraggedItem] = useState(null);
  const [dragOverItem, setDragOverItem] = useState(null);
  const [isInnerCardActive, setIsInnerCardActive] = useState(false);

  const dragStartHandler = (e, item) => {
    const card = e.target.closest(".card");

    setDraggedItem(item);
    card.style.background = "pink";

    setTimeout(() => (card.style.visibility = "hidden"), 0);
  };

  const dragEndHandler = (e) => {
    const card = e.target.closest(".card");
    card.style.background = "#fbcfe8";
    card.style.boxShadow = "none";
    card.style.transform = "scale(1)";
    card.style.visibility = "visible";

    setDraggedItem(null);
  };

  const dragLeaveHandler = (e) => {
    if (e.currentTarget.contains(e.relatedTarget)) return;

    const card = e.target.closest(".card");
    card.style.background = "#fbcfe8";
    card.style.boxShadow = "none";
    card.style.transform = "scale(1)";

    setDragOverItem(null);
    setIsInnerCardActive(false);
  };

  const dragOverHandler = (e) => {
    e.preventDefault();

    const card = e.target.closest(".card");
    card.style.background = "#f9a8d4";
    card.style.boxShadow = "0px 0px 20px 5px #f9a8d4";

    if (isInnerCardActive) card.style.transform = "scale(1.05)";

    if (card.id !== dragOverItem?.id && card.id !== draggedItem?.id) {
      setDragOverItem(card);
    }
  };

  const dropHandler = (e, item) => {
    e.preventDefault();

    const card = e.target.closest(".card");

    card.style.background = "#fbcfe8";
    card.style.boxShadow = "none";
    card.style.transform = "scale(1)";

    if (isInnerCardActive) {
      const filtered = items.filter(
        (dataItem) => dataItem?.id !== draggedItem?.id
      );
      const mapped = filtered.map((el) =>
        el.id === item?.id
          ? { ...el, children: [...el.children, { ...draggedItem }] }
          : el
      );
      const ordered = mapped.map((el, i) => ({ ...el, order: i + 1 }));

      setItems(ordered);

      setDragOverItem(null);
      setDraggedItem(null);
      setIsInnerCardActive(false);
      return;
    }

    setItems(
      items.map((dataItem) => {
        if (dataItem?.id === item?.id) {
          return { ...dataItem, order: draggedItem?.order };
        }
        if (dataItem?.id === draggedItem?.id) {
          return { ...dataItem, order: item.order };
        }
        return dataItem;
      })
    );
    setDragOverItem(null);
    setDraggedItem(null);
    setIsInnerCardActive(false);
  };

  let timer = useRef(null);

  useEffect(() => {
    if (timer.current) clearInterval(timer.current);
    if (dragOverItem)
      timer.current = setTimeout(() => setIsInnerCardActive(true), 1000);

    return () => clearTimeout(timer);
  }, [dragOverItem]);

  return [
    {
      draggable: true,
      onDragLeave: (e) => dragLeaveHandler(e),
      onDragEnd: (e) => dragEndHandler(e),
      onDragOver: (e) => dragOverHandler(e),
    },
    (e, item) => dragStartHandler(e, item),
    (e, item) => dropHandler(e, item),
    draggedItem,
    dragOverItem,
    isInnerCardActive,
  ];
};

export default useDrag;
