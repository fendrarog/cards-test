import { IconHide, IconShow, IconUpload } from "./Icons";

const ChildCard = ({
  child,
  item,
  items,
  setItems,
  modalCard,
  setModalCard,
}) => {
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

  return (
    <div className="bg-red-300 drop-shadow-md p-2 flex items-center gap-2 rounded-md">
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
        {modalCard?.props?.id === child.id ? <IconHide /> : <IconShow />}
      </button>
      <button
        onClick={(e) => handleChildUpload(e, item, child)}
        disabled={modalCard.isShow}
        className="flex items-center justify-center disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer p-1 rounded-full hover:drop-shadow-md hover:bg-red-400"
      >
        <IconUpload />
      </button>
    </div>
  );
};

export default ChildCard;
