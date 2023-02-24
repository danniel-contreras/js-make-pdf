const express = require("express")
const html_to_pdf = require('html-pdf-node');
const router = express.Router()

router.get("/", (req, res) => {
    res.send({ message: "Test" })
})

router.post("/make-pdf", async (req, res) => {
    let options = { format: 'A4', args: ['--no-sandbox', '--disable-setuid-sandbox'] };

    let file = { content: "<h1>Welcome to html-pdf-node</h1>" };
    const result = await html_to_pdf.generatePdf(file, options).then(pdfBuffer => {
        return pdfBuffer
    });

    return res.send({
        ok: true,
        message: "file created successfully",
        pdf: "data:application/pdf;base64," + result.toString("base64"),
    });
})


module.exports = { router }