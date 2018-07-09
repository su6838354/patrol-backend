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

        async update(params) {
            const res = await this.app.mysql.update(name, params);
            return { res }
        }

        async list(params) {
            const { limit=10, offset = 0 } = params;
            delete params.limit;
            delete params.offset;
            const res = await this.app.mysql.select(name, {
                where: { ...params },
                orders: [['id','desc']],
                limit,
                offset,
            });
            const allRes = await this.app.mysql.select(name, {
                where: { ...params }
            });

            const total = allRes.length;
            return { res, total }
        }

    }
    return BaseService
};