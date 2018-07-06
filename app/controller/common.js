/**
 * Created by pdd on 2018/6/22.
 */

const Controller = require('egg').Controller;
const sms = require('../tool/sms');
const url = require('url')
const upyun = require('upyun');

const bucket = new upyun.Bucket('sy-image-upyun', 'suyuan', 'su6838354');

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
}

module.exports = CommonController;