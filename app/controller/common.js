/**
 * Created by pdd on 2018/6/22.
 */

const Controller = require('egg').Controller;
const sms = require('../tool/sms');
const url = require('url')
const upyun = require('upyun');

const bucket = new upyun.Bucket('sy-image-upyun', 'suyuan', 'su6838354');

const superagent = require('superagent');

let jsessionId = '096C108B9409DB53BA5EE1CC178F55D6';

const getCookie = () => {
    const url1 = 'http://121.40.98.157:89/mygpsonline/json/loginAction_login.action?request_locale=zh_CN';
    superagent.post(url1)
        .send({ userName: '上海杰闳',
            userPass: '123456',
            userType: '100'
        })
        .type('form')
        .end((res, rep) => {
            const cookies = rep.headers['set-cookie']
            jsessionId = cookies[0].slice(11, 43)
            console.log('--', cookies)
            console.log('--', jsessionId)
        });
}
getCookie()
setInterval(() => getCookie(), 1000 * 60 * 10); // 30m

class CommonController extends Controller {
    async sendCode() {
        const { mobile } = this.ctx.request.body;
        if (mobile) {
            sms.sendSms(mobile);
            this.ctx.body = {code: 0, message: 'success', data: '验证码发生成功'}
        } else {
            this.ctx.body = {code: -1, message: 'faile', data: '验证码发生失败'}
        }
    }

    async imageSignHead() {
        const req = this.ctx.request;
        const query = url.parse(req.url, true).query
        const headSign = upyun.sign.getHeaderSign(bucket, query.method, query.path)
        this.ctx.body = JSON.stringify(headSign);
    }

    async getPoints() {
        const { vhcid, vehicle, begin_time, end_time } = this.ctx.request.body;
        const p = new Promise((resolve, reject) => {

            // var jsessionId = '096C108B9409DB53BA5EE1CC178F55D6';
            superagent.get(`http://121.40.98.157:89/mygpsonline/json/vehicleAction_GetJsonVdata.action?vhcid=${vhcid}&vehicle=${vehicle}&begin_time=${begin_time}&end_time=${end_time}&cret=&key=e617a19e0b2621bffb239dc0eb836bdf&datatype=0&intermin=0&timeorder=0&ip=port&dtype=&0`)
                .set('Cookie', 'JSESSIONID=' + jsessionId)
                .end((res, rep) => {
                        resolve(rep)
                }
            );
        })
        const data = await p;
        this.ctx.body = data.body

    }
}

module.exports = CommonController;
