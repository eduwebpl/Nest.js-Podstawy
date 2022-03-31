// eslint-disable-next-line @typescript-eslint/no-var-requires
const { default: dbConfig } = require('./src/config/database.config.ts');

module.exports = {
  ...dbConfig,
  entities: ['src/**/*.entity.{ts,js}'],
  seeds: ['src/seeders/seeds/**/*{.ts,.js}'],
  factories: ['src/seeders/factories/**/*{.ts,.js}'],
};
