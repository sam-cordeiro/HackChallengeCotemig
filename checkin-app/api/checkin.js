"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = handler;
function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Método não permitido' });
    }
    let data = '';
    req.on('data', (chunk) => {
        data += chunk.toString(); // Converte o Buffer para string
    });
    req.on('end', () => {
        try {
            const { name, email } = JSON.parse(data);
            if (!name || !email) {
                return res.status(400).json({ message: 'Nome e e-mail são obrigatórios' });
            }
            console.log(`Check-in recebido: ${name} <${email}>`);
            return res.status(200).json({ message: `Check-in realizado com sucesso, ${name}!` });
        }
        catch (error) {
            return res.status(400).json({ message: 'Erro ao processar dados JSON' });
        }
    });
}
