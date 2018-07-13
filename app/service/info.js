/**
 * Created by pdd on 2018/6/25.
 */

const ServiceFactory = require('../core/service-factory');
const BaseService = ServiceFactory('info');

class InfoService extends BaseService {
    async list(params) {
        const { limit=10, offset = 0 } = params;
        delete params.limit;
        delete params.offset;
        const res = await this.app.mysql.select('info', {
            where: { ...params },
            orders: [['id','desc']],
            limit,
            offset,
        });
        for (const item of res) {
            const polices = await this.app.mysql.select('staff', {
                where: {id: res.police_id}
            });
            const police = polices[0]
            if (police) {
                item.police = police;
            }
        }
        const allRes = await this.app.mysql.select('info', {
            where: { ...params }
        });

        const total = allRes.length;
        return { res, total }
    }
}


module.exports = InfoService;