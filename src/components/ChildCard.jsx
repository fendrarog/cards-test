import { IconHide, IconShow, IconUpload } from "./Icons";

const ChildCard = ({
  child,
  item,
  items,
  setItems,
  modalCard,
  setModalCard,
  draggedItem,
  setPendingAddCard,
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

  const handleClickChild = (e, child) => {
    setModalCard({
      isShow: true,
      props: { ...child, x: e.clientX, y: e.clientY },
    });
  };

  return (
    <div className="bg-red-200 shadow-md p-2 h-9 flex items-center gap-2 rounded-md cursor-pointer group/child">
      <h4
        className={`text-sm truncate group-hover/child:w-20 ${
          modalCard?.props?.id === child.id ? "w-20" : "w-36"
        }`}
      >
        {child.title}
      </h4>
      <div
        className={`gap-2 group-hover/child:flex flex-1 ${
          modalCard?.props?.id === child.id ? "flex" : "hidden"
        }`}
      >
        <button
          onClick={(e) =>
            modalCard.isShow
              ? setModalCard({ isShow: false, props: null })
              : handleClickChild(e, child)
          }
          disabled={modalCard.isShow && child.id !== modalCard.props.id}
          className={`${
            draggedItem?.id === item.id ? "duration-0" : "duration-300"
          } flex items-center justify-center disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer p-1 rounded-full hover:drop-shadow-md bg-red-300 hover:bg-red-400`}
        >
          {modalCard?.props?.id === child.id ? <IconHide /> : <IconShow />}
        </button>
        <button
          onClick={(e) => handleChildUpload(e, item, child)}
          disabled={modalCard.isShow}
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
