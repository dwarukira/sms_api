import { Sequelize } from 'sequelize-typescript';
import { Op } from 'sequelize';

// export const sequelize = new Sequelize({
//   dialect: 'sqlite',
//   operatorsAliases: Op,
//   database: 'movies',
//   storage: ':memory:',
//   models: [__dirname + '/models']
// })

console.log(__dirname + "/models")
export const sequelize =  new Sequelize({
  dialect: 'sqlite',
  operatorsAliases: Op,
  database: 'sms',
  storage: ':memory:',
  modelPaths: [__dirname + "/models"],
  modelMatch: (filename, member) => {
    return filename.substring(0, filename.indexOf('.model')) === member.toLowerCase();
  },
});
