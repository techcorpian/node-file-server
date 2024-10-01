const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

const folderPath = path.join(__dirname, 'files');

if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
}

app.post('/create-file', (req, res) => {
    const currentDateTime = new Date();
    const timestamp = currentDateTime.toISOString();
    const fileName = `${currentDateTime.toISOString().replace(/:/g, '-')}.txt`;
    const filePath = path.join(folderPath, fileName);

    fs.writeFile(filePath, timestamp, (err) => {
        if (err) {
            return res.status(500).json({ message: 'Error creating file', error: err });
        }
        res.status(201).json({ message: 'File created successfully', fileName });
    });
});

app.get('/list-files', (req, res) => {
    fs.readdir(folderPath, (err, files) => {
        if (err) {
            return res.status(500).json({ message: 'Error reading folder', error: err });
        }

        const textFiles = files.filter(file => path.extname(file) === '.txt');

        res.status(200).json({ files: textFiles });
    });
});

// Start the server
app.listen(3001, () => {
    console.log('Server is running on port 3001');
});
