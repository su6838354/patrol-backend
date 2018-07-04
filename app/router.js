'use strict';

/**
 * @param {Egg.Application} app - egg application
 */

module.exports = app => {
  const { router, controller } = app;
  router.post('/patrol/send_sms', controller.common.sendCode);
  /**
   * 信息管理
   */
  router.post('/patrol/info/add', controller.info.add);
  router.post('/patrol/info/list', controller.info.list);

  /**
   * 人员管理
   */
  router.post('/patrol/staff/add', controller.staff.add);
  router.post('/patrol/staff/list', controller.staff.list);
};
