var express = require('express');
var router = express.Router();
const fs = require('fs');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

router.get('/cook', function (req, res, next) {
    res.render('cook', fs);
});

router.get('/main', function (req, res, next) {
    res.render('main', fs);
});


const client_id = 'wGUQ5dnR4fGfwyhkLMXd';
const client_secret = 'aJ_WSLs9Y_';

router.get('/speech', function (req, res) {
    var queries = req.query;
    console.log('speech',queries.text);

    var api_url = 'https://openapi.naver.com/v1/voice/tts.bin';
    var request = require('request');
    var options = {
        url: api_url,
        form: {'speaker': 'jinho', 'speed': '0', 'text': queries.text},
        headers: {'X-Naver-Client-Id': client_id, 'X-Naver-Client-Secret': client_secret}
    };
    var writeStream = fs.createWriteStream('./tts.mp3');
    var _req = request.post(options).on('response', function (response) {
        console.log(response.statusCode) // 200
        console.log(response.headers['content-type'])
    });
    _req.pipe(writeStream); // file로 출력
    _req.pipe(res); // 브라우저로 출력

    //res.render('speech');
});

module.exports = router;
