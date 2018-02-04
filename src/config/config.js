"use strict";
var env       = process.env;

var Config = {
  test: {
    PORT: 3001,
    DATABASE: {
      host: 'localhost',
      port: 5432,
      dialect: 'mysql',
      database: 'my-database',
      password: 'mysqlUserPassword',
      username: 'mysqlUserName',
      define: {
        engine: 'MYISAM',
        timestamps: false, // Don't create for each model the 'createdAt' and 'updatedAt' field
        paranoid: false // Truly deleted. Not add a 'deletedAt' field
      },
      pool: {
        'max': 5,
        'min': 0,
        'idle': 10000
      },
      query: {
        raw: true
      }
    },
  },
  development: {
    PORT: 3002,
    DATABASE: {
      host: 'localhost',
      port: 5432,
      dialect: 'postgres',
      database: 'test',
      password: null,
      username: 'postgres',
      logging: true,
    },
  },
  production: {
    PORT: env.PORT,
    DATABASE: {
      host: 'ec2-50-16-231-2.compute-1.amazonaws.com',
      port: 5432,
      dialect: 'postgres',
      database: 'df4bss0tmafv8q',
      username: 'ohxruixrzurrcc',
      password: 'f6030cfb39a9139afefc520285c9d3da1961534212f804818759a056d03690e7'
    },
  }
};

module.exports = Config;
