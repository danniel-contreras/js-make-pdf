const express = require("express")
const router = express()
const { router_sales } = require("./sales.routes")
const { router_inventory } = require("./inventory.routes")


router.use(router_inventory)
router.use(router_sales)


module.exports = { router }