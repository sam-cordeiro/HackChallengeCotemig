export default function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.statusCode = 405;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ message: 'Método não permitido' }));
    return;
  }

  let data = '';

  req.on('data', (chunk: any) => {
    data += chunk.toString(); // Buffer compatível
  });

  req.on('end', () => {
    try {
      const { name, email } = JSON.parse(data);

      if (!name || !email) {
        res.statusCode = 400;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ message: 'Nome e e-mail são obrigatórios' }));
        return;
      }

      console.log(`Check-in recebido: ${name} <${email}>`);

      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ message: `Check-in realizado com sucesso, ${name}!` }));
    } catch (error) {
      res.statusCode = 400;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ message: 'Erro ao processar dados JSON' }));
    }
  });
}
