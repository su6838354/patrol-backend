/**
 * Created by pdd on 2018/6/25.
 */


const Controller = require('egg').Controller;

class InfoController extends Controller {
    async addInfo() {
        const ctx = this.ctx;
        const params = ctx.request.body;
        const order = await ctx.service.info.addInfo(params);
        ctx.body = order;
    }
}

module.exports = InfoController;