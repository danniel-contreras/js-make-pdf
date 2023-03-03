const { make_footer, make_header, numberWithCommas } = require("./utils")
const { generatePdf } = require("html-pdf-node");

class BalesMovementR {
    make_primary_body = (data) => {
        const { no_movement, date_final, date_initial, total } = data.data;

        return `
      <div class="grid grid-cols-2">
          <div>
              <p class="py-1 text-gray-700 font-semibold">Fecha: ${new Date().toLocaleDateString()}</p>
              <p class="py-1 text-gray-700 font-semibold">Fecha inicio: ${new Date(
            date_initial
        ).toLocaleDateString()} </p>
              <p class="py-1 text-gray-700 font-semibold">Fecha fin: ${new Date(
            date_final
        ).toLocaleDateString()}</p>
          </div>
          <div>
              <p class="py-1 text-gray-700 font-semibold">No. de movimientos: ${no_movement}</p>
              <p class="py-1 text-gray-700 font-semibold">Total en movimientos: $${numberWithCommas(
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
        <th class="text-sm font-bold text-white py-2">Codigo</th>
        <th class="text-sm font-bold text-white py-2">Tipo Paca</th>
        <th class="text-sm font-bold text-white py-2">Fecha</th>
        <th class="text-sm font-bold text-white py-2">Peso</th>
        <th class="text-sm font-bold text-white py-2">Cantidad</th>
        <th class="text-sm font-bold text-white py-2">Total</th>
      </tr>
    </thead>
    <tbody class="border">
    `;
        data.bales.forEach((bale) => {
            result += `
        <tr class="border-b">
            <td class="text-xs text-center font-normal text-gray-700 py-3">${bale.no
                }</td>
            <td class="text-xs text-center font-normal text-gray-700 py-3">${bale.code
                }</td>
            <td class="text-xs text-center font-normal text-gray-700 py-3">${bale.type
                }</td>
            <td class="text-xs text-center font-normal text-gray-700 py-3">${bale.date}</td>
            <td class="text-xs text-center font-normal text-gray-700 py-3">${bale.weight
                }</td>
            <td class="text-xs text-center font-normal text-gray-700 py-3">${bale.quantity
                }</td>
            <td class="text-xs text-center font-normal text-gray-700 py-3">$${numberWithCommas(
                    bale.total
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

class InventoryMovement {
    make_primary_body_move = (data) => {
        const { date_final, date_initial, total, no_movement_move, no_product, branch_dest } = data.data;

        return `
      <div class="grid grid-cols-2">
          <div>
              <p class="py-1 text-gray-700 font-semibold">Fecha: ${new Date().toLocaleDateString()}</p>
              <p class="py-1 text-gray-700 font-semibold">Fecha inicio: ${new Date(
            date_initial
        ).toLocaleDateString()} </p>
              <p class="py-1 text-gray-700 font-semibold">Fecha fin: ${new Date(
            date_final
        ).toLocaleDateString()}</p>
        <p class="py-1 text-gray-700 font-semibold">Total en movimientos enviados: $${numberWithCommas(total)}</p>
          </div>
          <div>
          <p class="py-1 text-gray-700 font-semibold">No. de productos movidos: ${no_product}</p>
              <p class="py-1 text-gray-700 font-semibold">No. de movimientos: ${no_movement_move}</p>
              <p class="py-1 text-gray-700 font-semibold">Sucursal: ${branch_dest}</p>
          </div>
      </div>
      `;
    }

    make_secondary_body_move = (data) => {
        let result = `
    <table class="w-full mt-6 text-sm border-[none]">
    <thead>
      <tr style="background-color:#092E60">
        <th class="text-sm font-bold text-white py-2">No.</th>
        <th class="text-sm font-bold text-white py-2">Producto</th>
        <th class="text-sm font-bold text-white py-2">Cantidad</th>
        <th class="text-sm font-bold text-white py-2">Total</th>
      </tr>
    </thead>
    <tbody class="border">
    `;
        data.moves.forEach((sale) => {
            result += `
        <tr class="border-b">
            <td class="text-xs text-center font-normal text-gray-700 py-3">${sale.no
                }</td>
            <td class="text-xs text-center font-normal text-gray-700 py-3">${sale.prod
                }</td>
            <td class="text-xs text-center font-normal text-gray-700 py-3">${sale.quantity
                }</td>
            <td class="text-xs text-center font-normal text-gray-700 py-3">$${numberWithCommas(
                    bale.total
                )}</td>
        <tr>`;
        });

        result += `
    </tody>
    </table>
    `;
        return result;
    };

    make_primary_body_rec = (data) => {
        const { date_final, date_initial, total, no_movement_move, no_product, branch_dest } = data.data;

        return `
      <div class="grid grid-cols-2">
          <div>
              <p class="py-1 text-gray-700 font-semibold">Fecha: ${new Date().toLocaleDateString()}</p>
              <p class="py-1 text-gray-700 font-semibold">Fecha inicio: ${new Date(
            date_initial
        ).toLocaleDateString()} </p>
              <p class="py-1 text-gray-700 font-semibold">Fecha fin: ${new Date(
            date_final
        ).toLocaleDateString()}</p>
        <p class="py-1 text-gray-700 font-semibold">Total en movimientos recibido: $${numberWithCommas(total)}</p>
          </div>
          <div>
          <p class="py-1 text-gray-700 font-semibold">No. de productos recibido: ${no_product}</p>
              <p class="py-1 text-gray-700 font-semibold">No. de movimientos: ${no_movement_move}</p>
              <p class="py-1 text-gray-700 font-semibold">Sucursal: ${branch_dest}</p>
          </div>
      </div>
      `;
    }

    make_secondary_body_rec = (data) => {
        let result = `
    <table class="w-full mt-6 text-sm border-[none]">
    <thead>
      <tr style="background-color:#092E60">
        <th class="text-sm font-bold text-white py-2">No.</th>
        <th class="text-sm font-bold text-white py-2">Producto</th>
        <th class="text-sm font-bold text-white py-2">Cantidad</th>
        <th class="text-sm font-bold text-white py-2">Total</th>
      </tr>
    </thead>
    <tbody class="border">
    `;
        data.moves.forEach((sale) => {
            result += `
        <tr class="border-b">
            <td class="text-xs text-center font-normal text-gray-700 py-3">${sale.no
                }</td>
            <td class="text-xs text-center font-normal text-gray-700 py-3">${sale.prod
                }</td>
            <td class="text-xs text-center font-normal text-gray-700 py-3">${sale.quantity
                }</td>
            <td class="text-xs text-center font-normal text-gray-700 py-3">$${numberWithCommas(
                    bale.total
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

const generate_bale_movement = async (data) => {
    const _bale = new BalesMovementR();
    let options = { args: ["--no-sandbox", "--disable-setuid-sandbox"] };

    let file = {
        content: `
      ${make_header("Reporte de movimientos de paca")}
      ${_bale.make_primary_body(data)}
      ${_bale.make_secondary_body(data)}
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

const generate_inventory_move = async (data) => {
    const _bale = new InventoryMovement();
    let options = { args: ["--no-sandbox", "--disable-setuid-sandbox"] };

    let file = {
        content: `
      ${make_header("Reporte de Movimientos de inventario(Movido)")}
      ${_bale.make_primary_body_move(data)}
      ${_bale.make_secondary_body_move(data)}
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

const generate_inventory_rec = async (data) => {
    const _bale = new InventoryMovement();
    let options = { args: ["--no-sandbox", "--disable-setuid-sandbox"] };

    let file = {
        content: `
      ${make_header("Reporte de Movimientos de inventario(Recibido)")}
      ${_bale.make_primary_body_move(data)}
      ${_bale.make_secondary_body_move(data)}
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

module.exports = { generate_bale_movement, generate_inventory_move, generate_inventory_rec }