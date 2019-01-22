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

  router.get('/signUp',controller.users.signUp);
  router.get('/signIn',controller.users.signIn);
  router.get('/signOut',controller.users.signOut);
  router.get('/users/findByName', controller.users.findByName);


  router.get('/wx/wxlogin',controller.users.wxlogin);
  router.get('/wx/submitWxInfo',controller.users.submitWxInfo);

  router.resources('users', '/users', controller.users);
};
