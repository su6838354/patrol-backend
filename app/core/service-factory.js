/**
 * Created by pdd on 2018/7/4.
 */

const Service = require('egg').Service;



module.exports = (name) => {
    class BaseService extends Service {
        async add(params) {
            const res = await this.app.mysql.insert(name, { ...params, create_time: Date.now()/1000 });
            return { res }
        }

        async list(params) {
            const { limit=10, offset = 0 } = params;
            const res = await this.app.mysql.select(name, {
                where: { ...params },
                orders: [['id','desc']],
                limit,
                offset,
            });
            return { res }
        }
    }
    return BaseService
};