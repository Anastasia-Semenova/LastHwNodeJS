bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({extended: false});
const fs = require("fs");


module.exports = function (app) {
    app.get('/users', (request, response) => {
        let result = [{
            "name": "Anastasia",
            "surname": "Semenova"

            , "skills": [
                "Понимание ООП; ",

                "Знания JavaCore, testing, multithreading; ",

                "Знание английского на разговорном уровне. "
            ]
        }];
        response.setHeader("Content-Type", "application/json");
        response.send(JSON.stringify(result));
    });


    app.get('/data', (request, response) => {
        let readFile = fs.readFileSync("forms.txt", "utf8").split("\n");
        let blocks = [];
        for (let i = 0; i < (readFile.length - 1); i++) {
            let recordData = readFile[i].split(", ");
            blocks.push({
                "firstName": recordData[0],
                "lastName": recordData[1],
                "email": recordData[2],
                "message": recordData[3]
            })
        }
        response.setHeader("Content-Type", "application/json");
        response.send(JSON.stringify(blocks));
    });

    app.post("/form", urlencodedParser, (request, response) => {
        let body = request.body;
        console.log(body);

        fs.appendFileSync("forms.txt",
            body["firstName"] + ", " +
            body["lastName"] +  ", " +
            body["email"] +  ", " +
            body["message"] + "\n");

        response.writeHead(302, "OK", {'Location': 'http://localhost:80/form.html'});
        response.send();
    });

};



