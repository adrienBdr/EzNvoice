'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      options: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.REAL
      },
      company_id: {
        type: Sequelize.INTEGER
      },
      currency_id: {
        type: Sequelize.INTEGER
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
        fields: ['company_id'],
        type: "foreign key",
        references: {
          table: 'Companies',
          field: 'id'
        },
        name: "products_company_id_fk",
        onDelete: 'cascade'
      }
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Products');
  }
};