const express = require("express")
const router = express()
const { router_sales } = require("./sales.routes")



router.use(router_sales)


module.exports = { router }