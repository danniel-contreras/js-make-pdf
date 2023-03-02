const { make_footer, make_header, numberWithCommas, formatedTimestamp } = require("./utils");
const { generatePdf } = require("html-pdf-node");

class SalesProduct {
    make_primary_body = (data) => {
        const {
            start_date,
            final_date,
            qt_product_sale,
            total_sales,
            no_sales,
        } = data.data;

        return `
        <div class="grid grid-cols-2">
            <div>
                <p class="py-1 text-gray-700 font-semibold">Fecha: ${new Date().toLocaleDateString()}</p>
                <p class="py-1 text-gray-700 font-semibold">Fecha inicio: ${new Date(
            start_date
        ).toLocaleDateString()} </p>
                <p class="py-1 text-gray-700 font-semibold">Fecha fin: ${new Date(
            final_date
        ).toLocaleDateString()}</p>
            </div>
            <div>
                <p class="py-1 text-gray-700 font-semibold">Cantidad de productos vendidos: ${qt_product_sale}</p>
                <p class="py-1 text-gray-700 font-semibold">No. de ventas: ${no_sales}</p>
                <p class="py-1 text-gray-700 font-semibold">Total en ventas: $${numberWithCommas(
            total_sales
        )}</p>
            </div>
        </div>
        `;
    };
    make_secoundary_body = (data) => {
        let result = `
        <table class="w-full mt-6 text-sm border-[none]">
        <thead>
          <tr style="background-color:#092E60">
            <th class="text-sm font-bold text-white py-2">No.</th>
            <th class="text-sm font-bold text-white py-2">Producto</th>
            <th class="text-sm font-bold text-white py-2">Cantidad</th>
            <th class="text-sm font-bold text-white py-2">Sucursal</th>
            <th class="text-sm font-bold text-white py-2">Precio</th>
            <th class="text-sm font-bold text-white py-2">Total(Con descuento)</th>
          </tr>
        </thead>
        <tbody class="border">
        `;
        data.sales.forEach((sale) => {
            result += `
            <tr class="border-b">
                <td class="text-xs text-center font-normal text-gray-700 py-3">${sale.name
                }</td>
                <td class="text-xs text-center font-normal text-gray-700 py-3">${sale.name
                }</td>
                <td class="text-xs text-center font-normal text-gray-700 py-3">${sale.quantity
                }</td>
                <td class="text-sm text-center font-normal text-gray-700 py-3">${sale.branch
                }</td>
                <td class="text-xs text-center font-normal text-gray-700 py-3">$${sale.price
                }</td>
                <td class="text-xs text-center font-normal text-gray-700 py-3">$${numberWithCommas(
                    sale.total
                )}</td>
            <tr>`;
        });

        result += `
        </tody>
        </table>
        `;
        return result;
    };
}

class RSales {
    make_primary_body = (data) => {
        const {
            start_date,
            final_date,
            qt_product_sale,
            total_sales,
            no_sales,
        } = data.data;

        return `
        <div class="grid grid-cols-2">
            <div>
                <p class="py-1 text-gray-700 font-semibold">Fecha: ${new Date().toLocaleDateString()}</p>
                <p class="py-1 text-gray-700 font-semibold">Fecha inicio: ${new Date(
            start_date
        ).toLocaleDateString()} </p>
                <p class="py-1 text-gray-700 font-semibold">Fecha fin: ${new Date(
            final_date
        ).toLocaleDateString()}</p>
            </div>
            <div>
                <p class="py-1 text-gray-700 font-semibold">Cantidad de productos vendidos: ${qt_product_sale}</p>
                <p class="py-1 text-gray-700 font-semibold">No. de ventas: ${no_sales}</p>
                <p class="py-1 text-gray-700 font-semibold">Total en ventas: $${numberWithCommas(
            total_sales
        )}</p>
            </div>
        </div>
        `;
    };
    make_secoundary_body = (data) => {
        let result = `
        <table class="w-full mt-6 text-sm border-[none]">
        <thead>
          <tr style="background-color:#092E60">
            <th class="text-sm font-bold text-white py-2">No.</th>
            <th class="text-sm font-bold text-white py-2">No. Ticket</th>
            <th class="text-sm font-bold text-white py-2">Sucursal</th>
            <th class="text-sm font-bold text-white py-2">Fecha</th>
            <th class="text-sm font-bold text-white py-2">Total</th>
          </tr>
        </thead>
        <tbody class="border">
        `;
        data.sales.forEach((sale) => {
            result += `
            <tr class="border-b">
                <td class="text-xs text-center font-normal text-gray-700 py-3">${sale.no
                }</td>
                <td class="text-xs text-center font-normal text-gray-700 py-3">${sale.ticket
                }</td>
                <td class="text-xs text-center font-normal text-gray-700 py-3">${sale.branch
                }</td>
                <td class="text-xs text-center font-normal text-gray-700 py-3">${formatedTimestamp(sale.date)
                }</td>
                <td class="text-xs text-center font-normal text-gray-700 py-3">$${numberWithCommas(
                    sale.total
                )}</td>
            <tr>`;
        });

        result += `
        </tody>
        </table>
        `;
        return result;
    };
}

class SalesEmployee {
    make_primary_body = (data) => {
        const { initial_date, final_date, no_sales, total } = data.data;

        return `
      <div class="grid grid-cols-2">
          <div>
              <p class="py-1 text-gray-700 font-semibold">Fecha: ${new Date().toLocaleDateString()}</p>
              <p class="py-1 text-gray-700 font-semibold">Fecha inicio: ${new Date(
            initial_date
        ).toLocaleDateString()} </p>
              <p class="py-1 text-gray-700 font-semibold">Fecha fin: ${new Date(
            final_date
        ).toLocaleDateString()}</p>
          </div>
          <div>
              <p class="py-1 text-gray-700 font-semibold">No. de ventas: ${no_sales}</p>
              <p class="py-1 text-gray-700 font-semibold">Total en ventas: $${numberWithCommas(
            total
        )}</p>
          </div>
      </div>
      `;
    };

    make_secondary_body = (data) => {
        let result = `
        <table class="w-full mt-6 text-sm border-[none]">
        <thead>
          <tr style="background-color:#092E60">
            <th class="text-sm font-bold text-white py-2">No.</th>
            <th class="text-sm font-bold text-white py-2">Vendedor</th>
            <th class="text-sm font-bold text-white py-2">Sucursal</th>
            <th class="text-sm font-bold text-white py-2">Fecha</th>
            <th class="text-sm font-bold text-white py-2">Total</th>
          </tr>
        </thead>
        <tbody class="border">
        `;
        data.sales.forEach((sale, index) => {
            result += `
            <tr class="border-b">
                <td class="text-xs text-center font-normal text-gray-700 py-3">${index + 1
                }</td>
                <td class="text-xs text-center font-normal text-gray-700 py-3">${sale.seller
                }</td>
                <td class="text-xs text-center font-normal text-gray-700 py-3">${sale.branch
                }</td>
                <td class="text-xs text-center font-normal text-gray-700 py-3">${formatedTimestamp(sale.date)}</td>
                <td class="text-xs text-center font-normal text-gray-700 py-3">$${numberWithCommas(
                    sale.total
                )}</td>
            <tr>`;
        });

        result += `
        </tody>
        </table>
        `;
        return result;
    };
}

// Example of options with args //
const generate_sales_product_report = async (data) => {
    const _sales_product = new SalesProduct();
    let options = { executablePath: '/usr/bin/chromium-browser', args: ["--no-sandbox", "--disable-setuid-sandbox"] };

    let file = {
        content: `
      ${make_header("Reporte de ventas por producto")}
      ${_sales_product.make_primary_body(data)}
      ${_sales_product.make_secoundary_body(data)}
      ${make_footer()}
      `,
    };

    const result = generatePdf(file, { ...options, format: "A4" }).then(
        (pdfBuffer) => {
            return pdfBuffer.toString("base64");
        }
    );

    return await result;
};

const generate_sales_report = async (data) => {
    const _sales = new RSales();
    let options = { headless: true, executablePath: '/usr/bin/google-chrome', args: ["--no-sandbox", "--disable-setuid-sandbox"] };

    let file = {
        content: `
      ${make_header("Reporte de ventas")}
      ${_sales.make_primary_body(data)}
      ${_sales.make_secoundary_body(data)}
      ${make_footer()}
      `,
    };

    const result = generatePdf(file, { ...options, format: "A4" }).then(
        (pdfBuffer) => {
            return pdfBuffer.toString("base64");
        }
    ).catch((error) => {
        console.log(error)
        return false
    })
    return await result;
};

const generate_sales_employee_report = async (
    data
) => {
    const _sales = new SalesEmployee();
    let options = { headless: true, executablePath: '/usr/bin/google-chrome', args: ["--no-sandbox", "--disable-setuid-sandbox"] };

    let file = {
        content: `
      ${make_header("Reporte de ventas por empleado")}
      ${_sales.make_primary_body(data)}
      ${_sales.make_secondary_body(data)}
      ${make_footer()}
      `,
    };

    const result = generatePdf(file, { ...options, format: "A4" }).then(
        (pdfBuffer) => {
            return pdfBuffer.toString("base64");
        }
    ).catch((error) => {
        console.log(error)
        return false
    })
    return await result;
};

module.exports = {
    generate_sales_employee_report, generate_sales_product_report, generate_sales_report
}