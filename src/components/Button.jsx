
const Button = ({ className = "", text = "", onClick = () => { } }) => {
   return (
      <button
         className={`text-white font-semibold border border-primary-default rounded-full min-w-[120px] h-[40px] capitalize ${className}`}
         onClick={onClick}
      >
         {text}
      </button>
   )
};

export default Button;
