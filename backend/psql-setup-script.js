const { sequelize } = require('./db/models');


console.log('Config Path:', path.resolve('backend', 'config', 'database.js'));


sequelize.showAllSchemas({ logging: false }).then(async (data) => {
  if (!data.includes(process.env.SCHEMA)) {
    await sequelize.createSchema(process.env.SCHEMA);
  }
});