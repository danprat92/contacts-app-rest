"use strict";
var env       = process.env.NODE_ENV || 'development';

module.exports = function(sequelize, DataTypes) {
  var Contacts = sequelize.define('Contacts', {
    name: {
      type: DataTypes.STRING,
      field: 'name',
    },
    line1: {
      type: DataTypes.STRING,
      field: 'line1',
    },
    line2: {
      type: DataTypes.STRING,
      field: 'line2',
    },
    city: {
      type: DataTypes.STRING,
      field: 'city',
    },
    state: {
      type: DataTypes.STRING,
      field: 'state',
    },
    zip: {
      type: DataTypes.STRING,
      field: 'zip',
    },
    phone: {
      type: DataTypes.STRING,
      field: 'phone',
      primaryKey: true,
    },
  }, {
    tableName: 'contacts',
    timestamps: false,
  });

  /**
   * Obtains all contacts from the database
   * @param  {Number} limit  Max number of records
   * @param  {Number} offset Current offset of records
   * @return {Promise} Promise to exec the query
   */
  Contacts.getAllContacts = function(limit, offset, filter) {
    var Op = sequelize.Op;
    var like = env === 'test' ? Op.like : Op.iLike;
    var phoneReg = filter ? filter.replace(/\D/g,'') : null;
    var where = filter ? {
      [Op.or] : [
        {
          name: {
            [like] : `%${filter.trim()}%`
          }
        },
        {
          line1: {
            [like] : `%${filter.trim()}%`
          },
        },
        {
          line2: {
            [like] : `%${filter.trim()}%`
          },
        },
        {
          city: {
            [like] : `%${filter.trim()}%`
          },
        },
        {
          state: {
            [like] : `%${filter.trim()}%`
          },
        },
        {
          zip: {
            [like] : `%${filter.trim()}%`
          },
        },
        sequelize.where(
          sequelize.fn('concat', sequelize.col('line1'), ' ', sequelize.col('line2'), ' ', sequelize.col('city'), ', ', sequelize.col('state'), ' ', sequelize.col('zip')),
          {
            like : `%${filter.trim()}%`
          }
        ),
      ]
    } : null;

    if (where && phoneReg) {
      where[Op.or].push({
        phone: {
          [like] : `%${phoneReg}%`
        },
      });
    }

    return Contacts.findAndCountAll({
      limit: limit,
      offset: offset,
      where: where,
      order: [
        ['name', 'ASC']
      ],
    })
  };
  /**
   * Finds a specific contact by phone
   * @param  {[type]} phone [description]
   * @return {[type]}       [description]
   */
  Contacts.findByPhone = function(phone) {
    var eq = sequelize.Op.eq;
    var phoneReg = phone ? phone.replace(/\D/g,'') : null;
    return Contacts.findOne({
      where: {
        phone: {
          [eq] : phoneReg,
        },
      },
    });
  }

  return Contacts;
};
