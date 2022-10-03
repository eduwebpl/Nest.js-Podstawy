// eslint-disable-next-line @typescript-eslint/no-var-requires
const { default: dbConfig } = require('./src/config/database.config.ts');

module.exports = {
  ...dbConfig,
  entities: ['src/**/*.entity.{ts,js}'],
<<<<<<< HEAD
  seeds: ['src/database/seeders/seeds/**/*{.ts,.js}'],
  factories: ['src/database/seeders/factories/**/*{.ts,.js}'],
=======
  seeds: ['src/seeders/seeds/**/*{.ts,.js}'],
  factories: ['src/seeders/factories/**/*{.ts,.js}'],
>>>>>>> 372e049727c069ab70160e1924f02ba6a9bcaec8
};
