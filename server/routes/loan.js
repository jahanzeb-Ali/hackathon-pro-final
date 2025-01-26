import LoanRequest from "../modals/LoadRequest.js";
import { Router } from "express";
const app = Router();
app.post('/loan-request', async (req, res) => {
    const { userId, category, subcategory, amount, loanPeriod } = req.body;
    try {
        const loanRequest = new LoanRequest({ userId, category, subcategory, amount, loanPeriod });
        await loanRequest.save();
        res.status(201).json({ message: 'Loan request submitted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error submitting loan request', error });
    }
});

app.post('/add-guarantor', async (req, res) => {
    const { loanRequestId, guarantors } = req.body;
    try {
        await LoanRequest.updateOne({ _id: loanRequestId }, { guarantors });
        res.status(200).json({ message: 'Guarantor details added successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error adding guarantor details', error });
    }
});
app.get('/loan-details', async (req, res) => {
    const { userId } = req.query;
    try {
        const loans = await LoanRequest.find({ userId });
        res.status(200).json(loans);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching loan details', error });
    }
});
export default app;