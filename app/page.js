import { serverFetch } from "@/service/http";
import HomePage from "@/template/Home";

async function page({ searchParams }) {
  const data = await serverFetch("/tour", await searchParams, {
    cache: "no-store",
  });

  return <HomePage toursData={data} />;
}

export default page;
