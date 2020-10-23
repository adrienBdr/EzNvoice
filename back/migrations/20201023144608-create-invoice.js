'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Invoices', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      date: {
        type: Sequelize.DATE
      },
      company_id: {
        type: Sequelize.INTEGER
      },
      customer_id: {
        type: Sequelize.INTEGER
      },
      total: {
        type: Sequelize.REAL
      },
      currency_id: {
        type: Sequelize.INTEGER
      },
      file: {
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
      "Invoices",
      {
        fields: ['company_id'],
        type: "foreign key",
        references: {
          table: 'Companies',
          field: 'id'
        },
        name: "invoices_company_id_fk",
        onDelete: 'cascade'
      }
    );
    await queryInterface.addConstraint(
      "Invoices",
      {
        fields: ['customer_id'],
        type: "foreign key",
        references: {
          table: 'Customers',
          field: 'id'
        },
        name: "invoices_customer_id_fk",
        onDelete: 'cascade'
      }
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Invoices');
  }
};