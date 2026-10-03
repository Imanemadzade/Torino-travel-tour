"use client";
import { useAddToBasket } from "@/service/mutations";
import Loader from "components/common/Loader";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

function ReserveButton({ id }) {
  const { isPending, mutate } = useAddToBasket();
  const router = useRouter();

  const cartHandler = () => {
    mutate(id, {
      onSuccess: () => {
        router.push("/checkout");
      },

      onError: (error) => {
        if (error.message === "Access token required") {
          toast.error("ابتدا ثبت نام کنید .");
          router.push("/");
        } else {
          toast.error(error.message);
        }
      },
    });
  };

  return (
    <div>
      <button
        onClick={cartHandler}
        className="w-38.5 flex items-center p-2  justify-center  bg-[#28A745] text-white rounded-sm text-[15px] font-normal md:w-30  lg:w-40 cursor-pointer hover:bg-primary "
      >
        {isPending ? (
          <Loader width={20} height={20} color="white" />
        ) : (
          "رزرو و خرید"
        )}
      </button>
    </div>
  );
}

export default ReserveButton;
