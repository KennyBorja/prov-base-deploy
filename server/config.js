const config = {
    host: process.env.DB_HOST || "bp8xqzgif5qalolxj7oz-mysql.services.clever-cloud.com",
    user: process.env.DB_USER || "ufveb6pwgq2y0ryt",
    password: process.env.DB_PASSWORD || "tcu0tll797FbEDCzvYNZ",
    database: process.env.DB_DATABASE || "bp8xqzgif5qalolxj7oz",
    port: process.env.PORT || 3001,
    frontendURL: process.env.FRONTEND_URL || "http://localhost:3000",
  };
  
  module.exports = config;
  