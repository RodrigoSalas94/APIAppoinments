export default {
  SECRET_KEY: process.env.SECRET_KEY || 'default_key',
  DB_DATABASE: process.env.DB_DATABASE || 'auth',
  DB_PASSWORD: process.env.DB_PASSWORD || '142asd182',
  DB_HOST: process.env.DB_HOST || 'localhost',
  PORT: process.env.PORT || 1234,
};
