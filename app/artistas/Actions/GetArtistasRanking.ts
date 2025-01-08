"use server";

export default async function GetArtistasRanking() {
  return [
    { id: 1, name: "The Beatles", rank: 1 },
    { id: 2, name: "Elton John", rank: 2 },
    { id: 3, name: "Madonna", rank: 3 },
  ];
}
