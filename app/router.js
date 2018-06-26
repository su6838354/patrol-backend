'use strict';

/**
 * @param {Egg.Application} app - egg application
 */

module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/order/find', controller.order.find);
  router.post('/patrol/send_sms', controller.common.sendCode);
  /**
   * 信息管理
   */
  router.post('/patrol/info/add', controller.info.addInfo);
  router.post('/patrol/info/list', controller.common.sendCode);
  router.post('/patrol/info/query', controller.common.sendCode);

    /**
     * 人员管理
     */
  router.post('/patrol/staff/query', controller.common.sendCode);
};
