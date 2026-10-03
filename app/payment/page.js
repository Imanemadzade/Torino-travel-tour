import Link from "next/link";

async function paymentPage({ searchParams }) {
  //  backend مارو در این صفحه بالا میاره

  const { status } = await searchParams;

  if (status === "success")
    return (
      <div className="  text-[#595959] text-2xl w-full h-screen flex flex-col gap-5 text-center items-center justify-center">
        <p>پرداخت شما با موفقیت انجام شد</p>
        <Link
          className="w-100  p-5 bg-[#28A745] text-white text-xl rounded-[10px]"
          href="/profile"
        >
          برو به پروفایل کاربری
        </Link>
      </div>
    );
  return (
    <div className="text-[#595959] text-2xl w-full h-screen text-center place-content-center rounded-[10px]">
      پرداخت با مشکل مواجه شد .
    </div>
  );
}

export default paymentPage;
