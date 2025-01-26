import LoanRequest from "../modules/LoadRequest";
import { Router } from "express";
const app = Router();
app.get('/applications', async (req, res) => {
    try {
        const applications = await LoanRequest.find();
        res.status(200).json(applications);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching applications', error });
    }
});
app.put('/applications/:id/status', async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
        await LoanRequest.updateOne({ _id: id }, { status });
        res.status(200).json({ message: 'Application status updated' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating status', error });
    }
});
app.post('/applications/:id/token', async (req, res) => {
    const { id } = req.params;
    const { tokenNumber } = req.body;
    try {
        await LoanRequest.updateOne({ _id: id }, { tokenNumber });
        res.status(200).json({ message: 'Token added to application' });
    } catch (error) {
        res.status(500).json({ message: 'Error adding token', error });
    }
});
app.get('/applications/filter', async (req, res) => {
    const { city, country } = req.query;
    try {
        const applications = await LoanRequest.find({ city, country });
        res.status(200).json(applications);
    } catch (error) {
        res.status(500).json({ message: 'Error filtering applications', error });
    }
});

export default app;