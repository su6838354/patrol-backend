/**
 * Created by pdd on 2018/7/4.
 */


const Controller = require('egg').Controller;



module.exports = (name) => {
    class BaseController extends Controller {

        async add() {
            const ctx = this.ctx;
            const params = ctx.request.body;
            const rep = await ctx.service[name].add(params);
            ctx.body = {code: 0, data: rep.res, message: 'success'}
        }

        async update() {
            const ctx = this.ctx;
            const params = ctx.request.body;
            const rep = await ctx.service[name].update(params);
            ctx.body = {code: 0, data: rep.res, message: 'success'}
        }

        async list() {
            const ctx = this.ctx;
            const params = ctx.request.body;
            const rep = await ctx.service[name].list(params);
            ctx.body = {code: 0, data: rep.res, message: 'success'}
        }

    }
    return BaseController
};