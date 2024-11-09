// migrations/20230102_add_users.js
module.exports = {
    async up(db, client) {
        // Add lastLogin field to users
        await db.collection('users').updateMany(
            {},
            { $set: { lastLogin: null } } // Set default value for existing users
        );

        // Insert initial users
        const initialUsers = [
            {
                address: "0x1234567890abcdef1234567890abcdef12345678",
                name: "Alice",
                email: "alice@example.com",
                kycVerified: true,
                createdAt: new Date(),
                lastLogin: new Date(),
            },
            {
                address: "0xabcdef1234567890abcdef1234567890abcdef12",
                name: "Bob",
                email: "bob@example.com",
                kycVerified: false,
                createdAt: new Date(),
                lastLogin: null,
            },
        ];

        await db.collection('users').insertMany(initialUsers);
    },

    async down(db, client) {
        // Remove initial users
        await db.collection('users').deleteMany({
            email: { $in: ["alice@example.com", "bob@example.com"] }
        });

        // Remove lastLogin field from users
        await db.collection('users').updateMany(
            {},
            { $unset: { lastLogin: "" } }
        );
    }
};
