const express = require("express")
const html_to_pdf = require('html-pdf-node');
const router_sales = express.Router()
const { generate_sales_employee_report, generate_sales_product_report, generate_sales_report } = require("../utils/sales.reports")

router_sales.get("/sales", (req, res) => {
    res.send({ message: "sales reports" })
})

router_sales.post("/sales/employee-sales", async (req, res) => {
    const data = req.body
    try {
        const result = await generate_sales_employee_report(data)
        res.send({ ok: true, file: "data:application/pdf;base64," + result });
    } catch (error) {
        res.send({ ok: false, message: "Error to generate file", error })
    }
})

router_sales.post("/sales/product-sales", async (req, res) => {
    const data = req.body
    try {
        const result = await generate_sales_product_report(data)
        res.send({ ok: true, file: "data:application/pdf;base64," + result });
    } catch (error) {
        res.send({ ok: false, message: "Error to generate file", error })
    }
})

router_sales.post("/sales/sale-sales", async (req, res) => {
    const data = req.body
    try {
        const result = await generate_sales_report(data)
        res.send({ ok: true, file: "data:application/pdf;base64," + result });
    } catch (error) {
        res.send({ ok: false, message: "Error to generate file", error })
    }
})

module.exports = { router_sales }