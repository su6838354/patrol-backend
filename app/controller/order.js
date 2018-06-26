/**
 * Created by pdd on 2018/6/21.
 */

const Controller = require('egg').Controller;

class OrderController extends Controller {
    async find() {
        const ctx = this.ctx;
        const id = ctx.query.id;
        const order = await ctx.service.order.find(id);
        ctx.body = order;
    }
}

module.exports = OrderController;