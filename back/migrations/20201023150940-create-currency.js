'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Currencies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      sign: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
    await queryInterface.addConstraint(
      "Products",
      {
        fields: ['currency_id'],
        type: "foreign key",
        references: {
          table: 'Currencies',
          field: 'id'
        },
        name: "products_currency_id_fk",
        onDelete: 'cascade'
      }
    );
    await queryInterface.addConstraint(
      "Invoices",
      {
        fields: ['currency_id'],
        type: "foreign key",
        references: {
          table: 'Currencies',
          field: 'id'
        },
        name: "invoices_currency_id_fk",
        onDelete: 'cascade'
      }
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Currencies');
  }
};