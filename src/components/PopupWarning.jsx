import { IconCheck, IconClose } from "./Icons";

const PopupWarning = ({ warning, setWarning, draggedItem, deleteCard }) => {
  if (draggedItem) return null;

  return (
    <div
      className={`${
        warning.isShow ? "fixed" : "hidden"
      } p-7 bg-red-100 w-56 opacity-90 rounded-xl z-50 `}
      style={{
        top: warning?.props?.y && warning?.props?.y + 35,
        left: warning?.props?.x && warning?.props?.x - 112,
      }}
    >
      <p className="text-sm mb-5">
        Карточка <span className="font-bold">{warning?.props?.title}</span>{" "}
        содержит{" "}
        <span className="font-bold">{warning?.props?.children.length}</span>{" "}
        {warning?.props?.children.length === 1 ? "карточку" : "карточки"}. Вы
        уверены что хотите удалить карточку и её внутренние карточки?
      </p>
      <div className="flex items-center text-3xl justify-center gap-5">
        <button
          className="flex p-1 rounded-full bg-green-400 text-white shadow-md duration-200 hover:shadow-lg hover:scale-110 active:scale-90"
          onClick={(e) => {
            deleteCard(e, warning?.props?.id);
            setWarning({ isShow: null, props: null });
          }}
        >
          <IconCheck />
        </button>
        <button
          className="flex p-1 rounded-full bg-red-400 text-white shadow-md duration-200 hover:shadow-lg hover:scale-110 active:scale-90"
          onClick={() => setWarning({ isShow: null, props: null })}
        >
          <IconClose />
        </button>
      </div>
      <div className="absolute -top-6 left-[90px] w-0 h-0 border-l-[24px] border-r-[24px] border-b-[24px] border-red-100 border-x-transparent"></div>
    </div>
  );
};

export default PopupWarning;
