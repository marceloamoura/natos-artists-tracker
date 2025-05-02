import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

const ARTISTS = [
  { name: "Bad Bunny", id: "209149" },
  { name: "Taylor Swift", id: "198" },
  { name: "Anitta", id: "7589" },
  // adicione mais
];

export default function Home() {
  const [selectedId, setSelectedId] = useState(ARTISTS[0].id);
  const [artist, setArtist] = useState(null);
  const [metrics, setMetrics] = useState(null);

  useEffect(() => {
    fetch(`/api/artist?id=${selectedId}`).then(res => res.json()).then(setArtist);
    fetch(`/api/artist-metrics?id=${selectedId}`).then(res => res.json()).then(setMetrics);
  }, [selectedId]);

  const renderChart = (data, label, color) => (
    <div className="mb-10">
      <h3 className="text-lg font-semibold mb-2">{label}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="date" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke={color} strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Painel de Artistas</h1>

      <select
        className="mb-6 p-2 border rounded w-full md:w-64"
        onChange={e => setSelectedId(e.target.value)}
        value={selectedId}
      >
        {ARTISTS.map(artist => (
          <option key={artist.id} value={artist.id}>{artist.name}</option>
        ))}
      </select>

      {artist && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold">{artist.name}</h2>
          <p className="text-gray-600">Gêneros: {artist.main_genres?.join(', ')}</p>
        </div>
      )}

      {metrics && (
        <div>
          {metrics.spotify_followers && renderChart(metrics.spotify_followers, 'Seguidores no Spotify', '#1DB954')}
          {metrics.youtube_subscribers && renderChart(metrics.youtube_subscribers, 'Inscritos no YouTube', '#FF0000')}
          {metrics.tiktok_followers && renderChart(metrics.tiktok_followers, 'Seguidores no TikTok', '#000000')}
          {/* Adicione mais aqui se quiser */}
        </div>
      )}
    </div>
  );
}
