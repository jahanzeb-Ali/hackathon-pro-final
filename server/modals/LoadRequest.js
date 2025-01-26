import mongoose from "mongoose";

const loanRequestSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ['Wedding Loans', 'Home Construction Loans', 'Business Startup Loans', 'Education Loans']
    },
    subcategory: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true,
        validate: {
            validator: function (value) {
                return value > 0;
            },
            message: 'Loan amount must be greater than 0'
        }
    },
    loanPeriod: {
        type: Number,
        required: true
    },
    guarantors: [
        {
            name: { type: String, required: true },
            email: { type: String, required: true },
            location: { type: String, required: true },
            cnic: { type: String, required: true }
        }
    ],
    status: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected'],
        default: 'Pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const LoanRequest = mongoose.model('LoanRequest', loanRequestSchema);

export default LoanRequest;
