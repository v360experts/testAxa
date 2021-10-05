var express = require('express');
var router = express.Router();
const { SecretClient } = require('@azure/keyvault-secrets');
const { DefaultAzureCredential } = require('@azure/identity');
//import { setLogLevel } from "@azure/logger";
const { KeyClient } = require("@azure/keyvault-keys");
//setLogLevel("info");

// when deployed to an azure host the default azure credential will authenticate the specified user assigned managed identity
//var credential = new DefaultAzureCredential({ managedIdentityClientId: userAssignedClientId });
 



const KEY_VAULT_URL = `https://keyvaultaxa.vault.azure.net/`;// || process.env['KEY_VAULT_URL'];
const SECRET_NAME = "PassAxa";// || process.env['SECRET_NAME'];





function getKeyVaultCredentials() {
  return new DefaultAzureCredential({
    managedIdentityClientId: "d7f513cb-ee4d-4ecf-a893-0ec0f81ea33f"
  });


  /*const credential = new ManagedIdentityCredential("d7f513cb-ee4d-4ecf-a893-0ec0f81ea33f");
  return credential;*/
}

function getKeyVaultSecret(credentials) {
  console.log('KEY_VAULT_URL->',KEY_VAULT_URL);
  console.log('SECRET_NAME->',SECRET_NAME);
  let keyVaultClient = new SecretClient(KEY_VAULT_URL, credentials);
  return keyVaultClient.getSecret(SECRET_NAME);
}

router.get('/secret', function (req, res) {
  let credentials = getKeyVaultCredentials();
  getKeyVaultSecret(credentials)
    .then(function (secret) {
      res.send(`Your secret value is: ${secret.value}.`);
    }).catch(function (err) {
      res.send(err);
    });
});

/* GET home page. */
router.get('/', function(req, res, next) {

  /*let credential = getKeyVaultCredentials();
  const client = new KeyClient(KEY_VAULT_URL, credential);*/
  const getResult = "hhh";//await client.getKey("PassAxa");
  res.render('index', { title: `Express ${getResult}.` });

});

module.exports = router;
