const PanelBox = ({title, children}) => {
  return (
    <div className="max-w-[909px] px-[86px] py-[76px]  ml-10 bg-[#424242] rounded-[20px]">
      <div className="pb-[40px] text-txtgreen text-5xl text-center">{title}</div>
      {children}
    </div>
  );
}

export default PanelBox