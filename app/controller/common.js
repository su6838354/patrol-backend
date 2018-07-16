/**
 * Created by pdd on 2018/6/22.
 */

const Controller = require('egg').Controller;
const sms = require('../tool/sms');
const url = require('url')
const upyun = require('upyun');

const bucket = new upyun.Bucket('sy-image-upyun', 'suyuan', 'su6838354');

const superagent = require('superagent');


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
        // 12150828  9035  2018-07-15%2000:00:00  2018-07-15%2023:59:59
        const { vhcid, vehicle, begin_time, end_time } = this.ctx.request.body;
        const p = new Promise((resolve, reject) => {
            superagent.get(`http://121.40.98.157:89/mygpsonline/json/vehicleAction_GetJsonVdata.action?vhcid=${vhcid}&vehicle=${vehicle}&begin_time=${begin_time}&end_time=${end_time}`)
                .set('Cookie', 'JSESSIONID=84D9A6794DF7DFDBAD27A29090CB9022')
                .end((res, rep) => {
                    resolve(rep)
                });
        })
        const data = await p;
        this.ctx.body = data.body

    }
}

module.exports = CommonController;