const PanelBox = ({title, children, className}) => {
  return (
    <div
      className={
        "max-w-[909px] px-[10px] md:px-[86px] py-[76px] bg-[#424242] rounded-[20px] " +
        className
      }
    >
      <div className="pb-[40px] text-txtgreen text-5xl text-center">
        {title}
      </div>
      {children}
    </div>
  );
}

export default PanelBox