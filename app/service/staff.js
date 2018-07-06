/**
 * Created by pdd on 2018/6/25.
 */


const ServiceFactory = require('../core/service-factory');
const BaseService = ServiceFactory('staff');

class StaffService extends BaseService {

    async list(params) {
        const { limit=10, offset = 0 } = params;
        delete params.limit;
        delete params.offset;
        const res = await this.app.mysql.select('staff', {
            where: { ...params },
            orders: [['id','desc']],
            limit,
            offset,
        });
        for (let item of res) {
            const p = await this.app.mysql.select('info', {
                where: { police_id: item.id },
            });
            item.info_count = p.length;
        }
        return { res }
    }

}


module.exports = StaffService;