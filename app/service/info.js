/**
 * Created by pdd on 2018/6/25.
 */

const ServiceFactory = require('../core/service-factory');
const BaseService = ServiceFactory('info');

class InfoService extends BaseService {
    async list(params) {
        const { limit=10, offset = 0, start_time = 0, end_time = 2540805844 } = params;
        delete params.limit;
        delete params.offset;
        // const res = await this.app.mysql.select('info', {
        //     where: { ...params },
        //     orders: [['id','desc']],
        //     limit,
        //     offset,
        // });

        let where = `where create_time >= ${start_time} and create_time <= ${end_time}`;
        if(params.type) {
            where = ` ${where} and type="${params.type}"`;
        }
        let sql = `select * from info ${where}`;
        console.log(sql)
        const res = await this.app.mysql.query(`${sql} limit ${offset}, ${limit}`);

        for (const item of res) {
            const polices = await this.app.mysql.select('staff', {
                where: {id: item.police_id}
            });
            const police = polices[0]
            if (police) {
                item.police = police;
            }
        }
        // const allRes = await this.app.mysql.select('info', {
        //     where: { ...params }
        // });
        const allRes = await this.app.mysql.query(sql);

        const total = allRes.length;
        return { res, total }
    }
}


module.exports = InfoService;