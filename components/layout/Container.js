function Container({ children, className }) {
  return (
    <div
      className={`max-w-360 px-7.75 mx-auto sm:px-14 md:px-20 lg:px-26 xl:px-31.5 ${className}`}
    >
      {children}
    </div>
  );
}

export default Container;
