module.exports = {
  // if case you host db on mlab.com the connection string 
  // should look like, mongodb://<dbuser>:<dbpassword>@ds133630.mlab.com:33630/db
  db: 'mongodb://username:password@url:port/db', // * for live mongodb, on mlab.com
  db_dev: 'mongodb://localhost:27017/eshop', // * for local mongodb
};