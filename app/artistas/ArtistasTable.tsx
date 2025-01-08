"use client";

import useSWR from "swr";
import GetArtistasRanking from "./Actions/GetArtistasRanking";

export default function ArtistasTable() {
  const { data, error, isLoading } = useSWR("artistas", GetArtistasRanking);

  console.log(data, error, isLoading);

  return (
    <div>
      <h1>Artistas</h1>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Artista</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((artista: any) => (
            <tr key={artista.id}>
              <td>{artista.rank}</td>
              <td>{artista.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
