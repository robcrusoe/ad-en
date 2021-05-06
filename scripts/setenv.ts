const { writeFile } = require('fs');
const { argv } = require('yargs');

/* Read environment variables from `.env` */
require('dotenv').config();

/* Read command-line arguments passed with yargs */
const environment = argv.environment;
const isProduction = environment === 'prod';

const targetPath = isProduction ? `./src/environments/environment.prod.ts` : `./src/environments/environment.ts`;

const environmentFC = `
  export const environment = {
    production: ${isProduction},
    AD_CLIENT_ID: "${process.env.AD_CLIENT_ID}",
    AD_OBJECT_ID: "${process.env.AD_OBJECT_ID}",
    AD_REDIRECT_URI: "${process.env.AD_REDIRECT_URI}",
    AD_TENANT_ID: "${process.env.AD_TENANT_ID}"
  };
`;

writeFile(targetPath, environmentFC, (error) => {
  if(error) {
    throw "setenv op failed!";
  }

  console.log('Wrote variables to target path!');
});