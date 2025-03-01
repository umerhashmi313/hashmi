const fs = require('fs');
const path = require('path');

// Define the folders and files to ignore
const IGNORE_DIRS = new Set(['build', '.git', 'node_modules', 'public', 'Assets']); // Add folder names to ignore
const IGNORE_FILES = new Set(['app.test.js', 'AppRoutes.js', 'logo.svg', 'reportWebVitals.js', 'setupTests.js', '.env', '.gitignore', 'package-lock.json', 'package.json', 'README.md', 'demosss']); // Add file names to ignore

function readAllText(folderPath, outputFile) {
    if (!fs.existsSync(folderPath)) {
        console.log(`The folder ${folderPath} does not exist.`);
        return;
    }

    const output = fs.createWriteStream(outputFile, { encoding: 'utf-8' });

    function traverseDirectory(currentPath) {
        const entries = fs.readdirSync(currentPath, { withFileTypes: true });

        for (const entry of entries) {
            const fullPath = path.join(currentPath, entry.name);

            if (entry.isDirectory()) {
                if (!IGNORE_DIRS.has(entry.name)) {
                    traverseDirectory(fullPath);
                }
            } else if (entry.isFile()) {
                if (!IGNORE_FILES.has(entry.name)) {
                    try {
                        const content = fs.readFileSync(fullPath, 'utf-8');
                        output.write(`--- ${path.relative(folderPath, fullPath)} ---\n`);
                        output.write(content);
                        output.write('\n\n'); // Add spacing between files
                    } catch (error) {
                        output.write(`Failed to read ${fullPath}: ${error.message}\n\n`);
                    }
                }
            }
        }
    }

    traverseDirectory(folderPath);
    output.end();
    console.log(`All desired file contents have been written to '${outputFile}'.`);
}

// Replace with your actual folder path
const folderToRead = 'C:\\Users\\hashm\\Desktop\\New folder (12)\\myapp'; // e.g., 'C:\\path\\to\\your\\folder'
const outputTxtFile = 'output_contents.txt'; // Specify your desired output file name

readAllText(folderToRead, outputTxtFile);