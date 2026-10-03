import { ThreeDots } from "react-loader-spinner";


function Loader({ className, height, width, color }) {
  return (
    <div className={className}>
      <ThreeDots height={height} width={width} color={color} />
    </div>
  );
}

export default Loader;
