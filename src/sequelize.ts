import { DB_URI } from './../config/config';
import { Sequelize } from 'sequelize-typescript';
import { Op } from 'sequelize';

const env = process.env.NODE_ENV || 'development';

export const sequelize = new Sequelize(DB_URI, {
  operatorsAliases: Op,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  modelPaths: [__dirname + "/models"],
  modelMatch: (filename, member) => {
    return filename.substring(0, filename.indexOf('.model')) === member.toLowerCase();
  },
});
