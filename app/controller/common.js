/**
 * Created by pdd on 2018/6/22.
 */

const Controller = require('egg').Controller;
const sms = require('../tool/sms');

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
}

module.exports = CommonController;