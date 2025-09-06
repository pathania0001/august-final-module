const Button = ({ children, onClick, type = "button" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className=" border-2 border-[#8E8E8E] text-[#F5F5F5] px-[60px] py-3 rounded-md cursor-pointer"
    >
      {children}
    </button>
  );
};

export default Button;
