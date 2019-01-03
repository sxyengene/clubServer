'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller,middleware } = app;
  router.get('/', controller.home.index);
  router.get('/sign',controller.sign.sign);
  router.get('/allCourses',controller.course.allCourses);

  /*user*/
  router.get('/users/all',controller.users.allUsers);
  router.get('/users/findByName', controller.users.findByName);

  router.resources('users', '/users', controller.users);
};
