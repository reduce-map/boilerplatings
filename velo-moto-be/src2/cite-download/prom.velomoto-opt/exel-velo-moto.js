// https://qna.habr.com/q/178959

const Excel = require('exceljs');
const fs = require('fs');

let data = fs.readFileSync('velo-moto.json');
data = JSON.parse(data);

console.log(data.products.length);

const options = {
    filename: 'velo-moto.xlsx',
    useStyles: true,
    useSharedStrings: true
};
const workbook = new Excel.stream.xlsx.WorkbookWriter(options);
const worksheet = workbook.addWorksheet('Товары velo-moto',

    {
        // pageSetup:{paperSize: 24, orientation:'landscape'},
        // properties: {
        //     defaultRowHeight: 40,
        //     tabColor: {
        //         argb:'000'
        //     }
        // }
    }
);

worksheet.columns = [
    { header: 'Товар', key: 'name', width: 80 },
    { header: 'Цена', key: 'price', width: 20 },
    { header: 'Состояние', key: 'state', width: 20 },
    { header: 'Код', key: 'code', width: 20 },
    { header: 'Сабкатегория', key: 'subcategoryName', width: 30 },
    { header: 'Категория', key: 'categoryName', width: 20 },
    { header: 'Ссылка на категорию', key: 'categoryLink', width: 80 },
    { header: 'Ссылка на товар', key: 'href', width: 80 },
]

data.products.forEach( product => {
    worksheet.addRow(product)
    // worksheet.addRow(product).commit();
})

worksheet.getRow(1).eachCell((cell) => {
    cell.font = { bold: true };
});

// worksheet.views = [
//     { state: 'frozen', xSplit: 1, ySplit: 1, activeCell: 'B2' },
// ];

workbook.commit().then(function() {
    console.log('excel file cretaed');
});
