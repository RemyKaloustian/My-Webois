module.exports = {
  // Secret key for JWT signing and encryption
  secret: 'super secret passphrase',
  // Database connection information
  databaseUrl: 'mongodb://localhost:27017/',
  // Current DB
  database: 'webProjectWaze',
  // Setting port for server
  port: 4000,
  // Configuring Mailgun API for sending transactional email
  mailgun_priv_key: 'mailgun private key here',
  // Configuring Mailgun domain for sending transactional email
  mailgun_domain: 'mailgun domain here',
  // Mailchimp API key
  mailchimpApiKey: 'mailchimp api key here',
  // SendGrid API key
  sendgridApiKey: 'sendgrid api key here',
  // Stripe API key
  stripeApiKey: 'stripe api key goes here',
  // necessary in order to run tests in parallel of the main app
  test_port: 3001,
  test_db: 'webProjectWaze_test',
  test_env: 'test',

  assetStaticPath: '/static',

  apiPath: '/api',

  accidentSeriousness: [
    'Sans gravité',
    'Léger',
    'Grave',
    'Mortel'
  ],

  accidentType: [
    'Autre',
    'Véhicules',
    'Piétons',
    'Vélos',
    'Véhicule et piétons',
    'Vélo et véhicule',
    'Vélo et piéton',
  ],

  googleApiKey: 'AIzaSyDlIz2hS3o1KObFIWgctUGks_eG_1tDzfY'
};
