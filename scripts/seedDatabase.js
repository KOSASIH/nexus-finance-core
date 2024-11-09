// scripts/seedDatabase.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../src/models/User');
const Transaction = require('../src/models/Transaction');
const KYC = require('../src/models/KYC');

dotenv.config(); // Load environment variables

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected successfully.');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

const seedDatabase = async () => {
    await connectDB();

    // Clear existing data
    await User.deleteMany({});
    await Transaction.deleteMany({});
    await KYC.deleteMany({});

    // Seed users
    const users = [
        {
            address: '0x1234567890abcdef1234567890abcdef12345678',
            name: 'Alice',
            email: 'alice@example.com',
            kycVerified: true,
            createdAt: new Date(),
            lastLogin: new Date(),
        },
        {
            address: '0xabcdef1234567890abcdef1234567890abcdef12',
            name: 'Bob',
            email: 'bob@example.com',
            kycVerified: false,
            createdAt: new Date(),
            lastLogin: null,
        },
    ];

    await User.insertMany(users);
    console.log('Users seeded successfully.');

    // Seed transactions
    const transactions = [
        {
            userAddress: '0x1234567890abcdef1234567890abcdef12345678',
            type: 'loan',
            amount: 1000,
            status: 'completed',
            createdAt: new Date(),
        },
        {
            userAddress: '0xabcdef1234567890abcdef1234567890abcdef12',
            type: 'repayment',
            amount: 500,
            status: 'pending',
            createdAt: new Date(),
        },
    ];

    await Transaction.insertMany(transactions);
    console.log('Transactions seeded successfully.');

    // Seed KYC
    const kycs = [
        {
            userAddress: '0x1234567890abcdef1234567890abcdef12345678',
            verified: true,
            verificationDate: new Date(),
            documents: ['doc1.pdf', 'doc2.pdf'],
            createdAt: new Date(),
        },
        {
            userAddress: '0xabcdef1234567890abcdef1234567890abcdef12',
            verified: false,
            documents: [],
            createdAt: new Date(),
        },
    ];

    await KYC.insertMany(kycs);
    console.log('KYC data seeded successfully.');

    // Close the database connection
    mongoose.connection.close();
};

seedDatabase();
