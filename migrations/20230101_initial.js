// migrations/20230101_initial.js
module.exports = {
    async up(db, client) {
        // Create User collection
        await db.createCollection('users');
        await db.collection('users').createIndex({ address: 1 }, { unique: true });
        await db.collection('users').createIndex({ email: 1 }, { unique: true });

        // Create Transaction collection
        await db.createCollection('transactions');
        await db.collection('transactions').createIndex({ userAddress: 1 });
        await db.collection('transactions').createIndex({ createdAt: -1 });

        // Create KYC collection
        await db.createCollection('kyc');
        await db.collection('kyc').createIndex({ userAddress: 1 }, { unique: true });
    },

    async down(db, client) {
        // Drop collections if they exist
        await db.collection('users').drop();
        await db.collection('transactions').drop();
        await db.collection('kyc').drop();
    }
};
