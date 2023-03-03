function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const make_header = (title) => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>Document</title>
      <script src="https://cdn.tailwindcss.com"></script>
      <style>
      html { -webkit-print-color-adjust: exact;style="page-break-after:always;" }
      @page {
        margin: 10px; 
      }
      </style>
    </head>
    <body class="h-screen p-5" style="page-break-after:always;height:100vh !important;">
        <div class="grid grid-cols-2">
        <div class="whitespaces-nowrap text-lg font-semibold">El Sotano - ${title}</div>
        <div>
            <img class="w-20 float-right" src="https://i.ibb.co/FhVFR6H/logo.png">
        </div>
    </div>
    `
}

const make_footer = () => {
    return `
    </body>
    </html>
    `
}

const formatedTimestamp = (date_d)=> {
    let d = new Date(date_d)
    const date = d.toISOString().split('T')[0];
    const time = d.toTimeString().split(' ')[0];
    return `${date} ${time}`
  }

module.exports = {
    numberWithCommas, make_footer, make_header,formatedTimestamp
}