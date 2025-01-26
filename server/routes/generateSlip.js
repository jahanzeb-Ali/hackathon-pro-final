import { Router } from "express";
const app = Router();
app.get('/generate-slip/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const loan = await LoanRequest.findById(id);
        const slip = {
            tokenNumber: `TOKEN-${id}`,
            qrCode: `https://qr-code-service/${id}`,
            appointment: { date: '2025-02-01', time: '10:00 AM', location: 'Saylani Office' }
        };
        res.status(200).json(slip);
    } catch (error) {
        res.status(500).json({ message: 'Error generating slip', error });
    }
});

export default app;