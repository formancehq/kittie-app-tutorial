import { DataSource } from "typeorm";
import { User } from "./entities/User";

const entities = [
  User,
];

var _db;

switch(process.env['SQL_TYPE']) {
  case 'mysql':
    _db = new DataSource({
      type: 'mysql',
      host: process.env['SQL_HOST'],
      port: parseInt(process.env['SQL_PORT'] || "3306"),
      username: process.env['SQL_USERNAME'],
      password: process.env['SQL_PASSWORD'],
      database: process.env['SQL_DATABASE_NAME'],
      entities: entities,
      logging: true,
      synchronize: true, //TODO only do this in debug mode!
    });
    break;

  case 'postgres':
    _db = new DataSource({
      type: 'postgres',
      host: process.env['SQL_HOST'],
      port: parseInt(process.env['SQL_PORT'] || "3306"),
      username: process.env['SQL_USERNAME'],
      password: process.env['SQL_PASSWORD'],
      schema: process.env['SQL_SCHEMA_NAME'],
      entities: entities,
      logging: true,
      synchronize: true,
    });
    break;

  default: //use sqlite
    _db = new DataSource({
      type: 'sqlite',
      database: 'kittie.sql',
      entities: entities,
      logging: true,
      synchronize: true,
    });
}

export const db = _db;