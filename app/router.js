'use strict';

/**
 * @param {Egg.Application} app - egg application
 */

module.exports = app => {
  const { router, controller } = app;
  router.get('/patrol/image/sign/head', controller.common.imageSignHead);
  router.post('/patrol/send_sms', controller.common.sendCode);

  /**
   * 信息管理
   */
  router.post('/patrol/info/add', controller.info.add);
  router.post('/patrol/info/list', controller.info.list);
    router.post('/patrol/info/update', controller.info.update);

  /**
   * 人员管理
   */
  router.post('/patrol/staff/add', controller.staff.add);
  router.post('/patrol/staff/list', controller.staff.list);
    router.post('/patrol/staff/update', controller.staff.update);
};
