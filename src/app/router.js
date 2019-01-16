'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/sign',controller.sign.sign);
  router.get('/allCourses',controller.course.allCourses);
  router.get('/allUsers',controller.user.allUsers);
};