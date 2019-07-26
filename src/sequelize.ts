import { DB_URI } from './../config/config';
import { Sequelize } from 'sequelize-typescript';
import { Op } from 'sequelize';

const env = process.env.NODE_ENV || 'development';

export const sequelize =  new Sequelize(DB_URI,{
  operatorsAliases: Op,
  modelPaths: [__dirname + "/models"],
  modelMatch: (filename, member) => {
    return filename.substring(0, filename.indexOf('.model')) === member.toLowerCase();
  },
});
