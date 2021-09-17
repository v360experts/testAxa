var express = require('express');
var router = express.Router();
const { SecretClient } = require('@azure/keyvault-secrets');
const { DefaultAzureCredential } = require('@azure/identity');
const KEY_VAULT_URL = 'https://keyvaultaxa.vault.azure.net/' || process.env['KEY_VAULT_URL'];
const SECRET_NAME = 'PassAxa' || process.env['SECRET_NAME'];



function getKeyVaultCredentials() {
  return new DefaultAzureCredential();
}

function getKeyVaultSecret(credentials) {
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

  let credentials = getKeyVaultCredentials();
  getKeyVaultSecret(credentials)
    .then(function (secret) {
      //res.send(`Your secret value is: ${secret.value}.`);
      res.render('index', { title: `Express ${secret.value}.` });
    }).catch(function (err) {
      res.send(err);
    });
 
});

module.exports = router;
