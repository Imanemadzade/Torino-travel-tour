function ModalContainer({ children, isOpenModal, className }) {
  if (!isOpenModal) return;
  return (
    <div className={`fixed top-0 left-0 h-full w-full  z-10 ${className}`}>
      <div className="w-full h-full flex justify-center items-center">
        <div className="min-w-25 min-h-25">{children}</div>
      </div>
    </div>
  );
}

export default ModalContainer;
