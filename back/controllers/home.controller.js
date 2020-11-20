const db = require('../models');
const utils = require("../utils");
const { QueryTypes } = require('sequelize');

module.exports = {
    getAllInfo: async function(req, res, next) {
        const {user_id} = req.body;

        const countInvoice = await db.sequelize.query(`SELECT count(*) FROM "Invoices" LEFT JOIN "Companies" as cp ON cp.user_id = ${user_id} AND company_id = cp.id`, {  type: QueryTypes.SELECT})
        const countCustomer = await db.sequelize.query(`SELECT count(*) FROM "Customers" LEFT JOIN "Companies" as cp ON cp.user_id = ${user_id} AND company_id = cp.id`, {  type: QueryTypes.SELECT})
        const countCompany = await db.sequelize.query(`SELECT count(*) FROM "Companies" WHERE user_id = ${user_id}`, {  type: QueryTypes.SELECT})
        const countBenefice = await db.sequelize.query(`SELECT SUM(total) FROM "Invoices" LEFT JOIN "Companies" as cp ON cp.user_id = ${user_id} AND company_id = cp.id`, {  type: QueryTypes.SELECT})
        const countProduct = await db.sequelize.query(`SELECT count(*) FROM "Products" LEFT JOIN "Companies" as cp ON cp.user_id = ${user_id} AND company_id = cp.id`, {  type: QueryTypes.SELECT})
        return utils.resSuccess(res, {
            invoice_number: parseInt(countInvoice[0].count, 10),
            company_number: parseInt(countCompany[0].count, 10),
            customer_number: parseInt(countCustomer[0].count, 10),
            benefice_number: parseInt(countBenefice[0].sum, 10),
            product_number: parseInt(countProduct[0].count, 10)
        });
    }
}
