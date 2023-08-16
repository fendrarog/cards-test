const PopupCardInfo = ({ popup, draggedItem, pendingHidePopup }) => {
  if (draggedItem) return null;

  return (
    <div
      className={`${
        popup.isShow ? "fixed" : "hidden"
      } p-7 bg-red-100 w-56 opacity-90 rounded-xl z-50 ${
        pendingHidePopup?.isPanding &&
        pendingHidePopup?.cardId === popup?.props?.id
          ? "animate-toshadow"
          : "animate-fromshadow"
      } `}
      style={{
        top: popup?.props?.y && popup?.props?.y + 35,
        left: popup?.props?.x && popup?.props?.x - 112,
      }}
    >
      <h4 className="mb-2 font-semibold">{popup.props?.title}</h4>
      <p className="mb-2">{popup.props?.description}</p>

      <div className={`flex flex-wrap gap-2`}>
        {popup.props?.children.length
          ? popup.props?.children.map((child, i) => (
              <div
                key={i}
                className="bg-red-300 drop-shadow-md p-0.5 flex items-center gap-2 rounded-md text-sm"
              >
                <h4 className="truncate w-24 max-w-full">{child.title}</h4>
              </div>
            ))
          : null}
      </div>

      <div className="absolute -top-6 left-[90px] w-0 h-0 border-l-[24px] border-r-[24px] border-b-[24px] border-pink-100 border-x-transparent"></div>
    </div>
  );
};

export default PopupCardInfo;
