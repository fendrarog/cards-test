import { IconHide, IconShow, IconUpload } from "./Icons";

const ChildCard = ({
  child,
  item,
  items,
  setItems,
  popup,
  setPopup,
  draggedItem,
  setPendingAddCard,
  setPendingHidePopup,
}) => {
  const handleChildUpload = (e, item, child) => {
    setPendingAddCard({ isPanding: true, cardId: child.id });

    setTimeout(
      () => setPendingAddCard({ isPanding: false, cardId: null }),
      300
    );

    const processedChildren = item.children.filter((el) => el.id !== child.id);
    const cards = [...items, { ...child, order: items.length + 1 }];
    const processedCards = cards.map((el) =>
      el.id === item.id ? { ...el, children: processedChildren } : { ...el }
    );
    setItems(processedCards);
  };

  const handleShowPopup = (e, child) => {
    setPopup({
      isShow: true,
      props: { ...child, x: e.clientX, y: e.clientY },
    });
  };

  const handleHidePopup = (e, child) => {
    setPendingHidePopup({ isPanding: true, cardId: child.id });

    setTimeout(() => {
      setPopup({
        isShow: false,
        props: null,
      });
      setPendingHidePopup({ isPanding: false, cardId: null });
    }, 290);
  };

  return (
    <div className="bg-red-200 shadow-md p-2 h-9 flex items-center gap-2 rounded-md cursor-pointer group/child">
      <h4
        className={`text-sm truncate group-hover/child:w-20 ${
          popup?.props?.id === child.id ? "w-20" : "w-36"
        }`}
      >
        {child.title}
      </h4>
      <div
        className={`gap-2 group-hover/child:flex flex-1 ${
          popup?.props?.id === child.id ? "flex" : "hidden"
        }`}
      >
        <button
          onClick={(e) =>
            popup.isShow ? handleHidePopup(e, child) : handleShowPopup(e, child)
          }
          disabled={popup.isShow && child.id !== popup.props.id}
          className={`${
            draggedItem?.id === item.id ? "duration-0" : "duration-300"
          } flex items-center justify-center disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer p-1 rounded-full hover:drop-shadow-md bg-red-300 hover:bg-red-400`}
        >
          {popup?.props?.id === child.id ? <IconHide /> : <IconShow />}
        </button>
        <button
          onClick={(e) => handleChildUpload(e, item, child)}
          disabled={popup.isShow}
          className={`${
            draggedItem?.id === item.id ? "duration-0" : "duration-300"
          } flex items-center justify-center disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer p-1 rounded-full hover:drop-shadow-md bg-red-300 hover:bg-red-400`}
        >
          <IconUpload />
        </button>
      </div>
    </div>
  );
};

export default ChildCard;
