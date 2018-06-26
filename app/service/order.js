/**
 * Created by pdd on 2018/6/21.
 */

const Service = require('egg').Service;

class OrderService extends Service {
    async find(id) {
        const order = await this.app.mysql.get('cbo_order', {id: id});
        console.log(id);
        return { order }
    }

}

module.exports = OrderService;