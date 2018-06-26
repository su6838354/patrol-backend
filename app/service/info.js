/**
 * Created by pdd on 2018/6/25.
 */


const Service = require('egg').Service;

class InfoService extends Service {
    async addInfo(params) {
        const res = await this.app.mysql.insert('p_info', params);
        return { res }
    }

}

module.exports = InfoService;