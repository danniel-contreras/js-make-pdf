const { generate_bale_movement, generate_inventory_move, generate_inventory_rec } = require("../utils/inventory.reports")
const express = require("express")
const router_inventory = express.Router()

router_inventory.post("/inventory/bales-movement", async (req, res) => {
    const data = req.body
    try {
        const result = await generate_bale_movement(data)
        res.send({ ok: true, file: "data:application/pdf;base64," + result });
    } catch (error) {
        res.send({ ok: false, message: "Error to generate file", error })
    }
})

router_inventory.post("/inventory/inventory-move", async (req, res) => {
    const data = req.body
    try {
        const result = await generate_inventory_move(data)
        res.send({ ok: true, file: "data:application/pdf;base64," + result });
    } catch (error) {
        res.send({ ok: false, message: "Error to generate file", error })
    }
})

router_inventory.post("/inventory/inventory-rec", async (req, res) => {
    const data = req.body
    try {
        const result = await generate_inventory_rec(data)
        res.send({ ok: true, file: "data:application/pdf;base64," + result });
    } catch (error) {
        res.send({ ok: false, message: "Error to generate file", error })
    }
})

module.exports = { router_inventory }