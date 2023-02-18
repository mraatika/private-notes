const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const [, env = 'dev'] = process.argv.slice(2);

console.log(`Deploying docs to ${env} environment`);

const distDir = './dist';
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir);
}

// move the static docs html file to dist and rename it to index.html
fs.renameSync('redoc-static.html', path.join(distDir, 'index.html'));

console.log(`Uploading docs and types to bucket`);

// copy the file to the api bucket
const bucketName = `private-notes-${env}-api-bucket`;
execSync(`aws s3 cp ./dist s3://${bucketName} --recursive`);

console.log(`All done!`);
