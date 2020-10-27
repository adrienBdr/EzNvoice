'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Invoice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Invoice.init({
    date: DataTypes.DATE,
    date_due: DataTypes.DATE,
    company_id: DataTypes.INTEGER,
    customer_id: DataTypes.INTEGER,
    total: DataTypes.FLOAT,
    tax: DataTypes.FLOAT,
    currency_id: DataTypes.INTEGER,
    file: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Invoice',
  });
  return Invoice;
};