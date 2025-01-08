"use server";

import ChartMetricIntegrador from "@/lib/Chartmetric";

export default async function GetArtistasRanking() {
  const response = await ChartMetricIntegrador.get("artist/sp_followers/list?min=500&max=10000&offset=0&code2=BR&city=Chicago", {
    headers: {
      "Content-Type": "application/json",
    },
  });

  console.log(response.data.obj.data);
  return [
    { id: 1, name: "The Beatles", rank: 1 },
    { id: 2, name: "Elton John", rank: 2 },
    { id: 3, name: "Madonna", rank: 3 },
  ];
}
