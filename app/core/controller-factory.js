/**
 * Created by pdd on 2018/7/4.
 */


const Controller = require('egg').Controller;



module.exports = (name) => {
    class BaseController extends Controller {

        async add() {
            const ctx = this.ctx;
            const params = ctx.request.body;
            ctx.body = await ctx.service[name].add(params);
        }

        async list() {
            const ctx = this.ctx;
            const params = ctx.request.body;
            ctx.body = await ctx.service[name].list(params);
        }

    }
    return BaseController
};