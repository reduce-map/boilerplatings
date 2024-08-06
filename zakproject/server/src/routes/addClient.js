const Client = require('../../database/models/dataClient').Client


exports.post = async (req, res) => {
    let result = await addNewClient(req.query.user_id, req.body);
    if (result) {
        console.log(result);
        res.status(200).json(result);
    }else{
        res.status(400).json(result)
    }
}




function addNewClient(user_id, dataClient) {
    return new Promise(resolve => {
        new Client({
            user_id: user_id,
            name: {
                first_name: dataClient.name.first_name||'',
                second_name: dataClient.name.second_name||'',
                patronymic: dataClient.name.patronymic||'',
            },
            data: {
                mail: dataClient.data.mail||[],//Доьавить mail так как это масив объектов
                site: dataClient.data.site||[],//Доьавить site так как это масив объектов
                telephone: dataClient.data.telephone||[],//Доьавить telephone так как это масив объектов
            },//Доьавить data так как это масив объектов
            items: dataClient.items||[],//Доьавить Items так как это масив объектов
            post: dataClient.post||[],//Доьавить Items так как это масив объектов
            message: dataClient.message||[],////Доьавить message так как это масив объектов
            ////Добавить send так как это масив объектов
        }).save(async (err) => {
            if (err)  resolve({ success: false, message: "Client registration failed" });;
            resolve({ success: true, message: "Client registration successful" });
        });
    })



}