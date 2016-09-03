var databaseURIs = {
  test: 'mongodb://localhost/ballr-test',
  development: 'mongodb://localhost/ballr-dev',
  production: process.env.MONGODB_URI || 'mongodb://localhost/ballr-prod'
}

module.exports = function(env) {
  return databaseURIs[env];
}