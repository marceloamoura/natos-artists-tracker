export default async function handler(req, res) {
    const token = process.env.CHARTMETRIC_TOKEN;
    const { id } = req.query;
  
    try {
      const response = await fetch(`https://api.chartmetric.com/api/artist/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      res.status(200).json(data);
    } catch {
      res.status(500).json({ error: 'Erro ao buscar artista' });
    }
  }
  