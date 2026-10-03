import { serverFetch } from "@/service/http";

import TourDtails from "@/template/TourDtails";

async function TourDetailsPage({ params }) {
  const tourData = await serverFetch(`/tour/${(await params).id}`);
  return <TourDtails {...tourData} />;
}

export default TourDetailsPage;
