/**
 * Created by pdd on 2018/7/11.
 */

const data = {
    "version": 1,
    "success": true,
    "groups": [
        {
            "id": 3455152,
            "name": "上海杰闳文化传播有限公司",
            "vehicles": [
                {
                    "id": 12150835,
                    "name": "2153",
                    "vKey": "4660f3bd748c4a365d47411143f2343e"
                },
                {
                    "id": 12150828,
                    "name": "9035",
                    "vKey": "e465f6a8525954fd1b260f2d99eeeb83"
                }
            ]
        }
    ]
};

const user = {
    "version": 1,
    "success": true,
    "uid": 2435577,
    "uKey": "41a21112614ad3f3f748a5e43c272d5f",
    "userType": -1,
    "creater": 2254586
}

const card = {
    "version": 1,
    "success": true,
    "locs": [
        {
            "id": 12150835,
            "name": "2153",
            "mobile": "1064943724047",
            "recvtime": -2209017600000,
            "gpstime": -2209017600000,
            "lat": 0, //纬度
            "lng": 0, //经度
            "lat_xz": 0, // 纬度修正值
            "lng_xz": 0, // 经度修正值
            "baidu_lat_xz": 0.006,
            "baidu_lng_xz": 0.0065,
            "state": "",
            "speed": 0,
            "direct": 0,
            "temp": 0,
            "oil": 0,
            "oilMN1": 0,
            "oilMN2": 0,
            "distance": 0,
            "totalDis": 0,
            "av": "0",
            "alt": 0,
            "info": "",
            "vhcofflinemin": 10,
            "stopDefDis": 0,
            "stopDefLat": 0,
            "stopDefLng": 0,
            "temp1": "",
            "temp2": "",
            "temp3": "",
            "temp4": "",
            "oil1": 0,
            "oil2": 0
        }
    ]
}

// const request = require('./request');
// request({
//     url: 'http://121.40.98.157:89/gpsonline/GPSAPI',
//     data: JSON.stringify({
//         version: 1,
//         method: 'loginSystem',
//         name: '上海杰闳',
//         pwd: '123456'
//     }),
//     method: 'POST',
//     headers: {
//         'Content-type': 'application/x-www-form-urlencoded'
//     }
// }).then(rep => {
//     console.log(rep.data)
// })
var request = require('request');


// request.post('http://121.40.98.157:89/gpsonline/GPSAPI', {form: {
//     version: 1,
//     method: 'loginSystem',
//     name: '上海杰闳',
//     pwd: '123456'
// }}, (err, rep) => {
//     console.log(rep.body)
// })

var j = request.jar();
var cookie = request.cookie('JSESSIONID=84D9A6794DF7DFDBAD27A29090CB9022');
var url = 'http://121.40.98.157:89';
j.setCookie(cookie, url);

// request({url: url, jar: j}, function () {
//     request('http://121.40.98.157:89/mygpsonline/json/vehicleAction_GetJsonVdata.action?vhcid=12150828&cret=&vehicle=9035&key=e617a19e0b2621bffb239dc0eb836bdf&begin_time=2018-07-15%2000:00:00&end_time=2018-07-15%2023:59:59&datatype=0&intermin=0&timeorder=0&ip=port&dtype=&0', (err, rep) => {
//         console.log(err, rep.body);
//     })
// })


const superagent = require('superagent');
// superagent.get('http://121.40.98.157:89/mygpsonline/json/vehicleAction_GetJsonVdata.action?vhcid=12150828&vehicle=9035&begin_time=2018-07-15%2000:00:00&end_time=2018-07-15%2023:59:59')
//     .set('Cookie', 'JSESSIONID=84D9A6794DF7DFDBAD27A29090CB9022')
//     .end(function(res, rep){
//         console.log(res, rep.body)
//     });


const url1 = 'http://121.40.98.157:89/mygpsonline/json/loginAction_login.action?request_locale=zh_CN';
superagent.post(url1)
    .send({ userName: '上海杰闳',
        userPass: '123456',
        userType: '100'
    })
    .type('form')
    .end(function(res, rep){
        console.log(res, rep)
        console.log('--',rep.body)
        const cookies = rep.headers['set-cookie']
        const jsessionId = cookies[0].slice(11, 43)
        console.log('--', cookies)
        console.log('--', jsessionId)
    });


