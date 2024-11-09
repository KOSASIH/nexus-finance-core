// scripts/backup.js
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

const backupDatabase = () ```javascript
// scripts/backup.js
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

const backupDatabase = () => {
    const backupDir = path.join(__dirname, 'backups');
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupFile = path.join(backupDir, `backup-${timestamp}.json`);

    // Create backups directory if it doesn't exist
    if (!fs.existsSync(backupDir)) {
        fs.mkdirSync(backupDir);
    }

    // Execute the mongodump command
    exec(`mongodump --uri="${process.env.DB_URI}" --out="${backupDir}"`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error during backup: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`Backup stderr: ${stderr}`);
            return;
        }
        console.log(`Backup completed successfully. Files saved to: ${backupDir}`);
    });
};

backupDatabase();
