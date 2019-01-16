module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const User = app.model.define('user', {
    id: {
      type:INTEGER(11),
      primaryKey:true
    },
    name:STRING(20),
    department:STRING(20),
    nickname:STRING(50),
    password:STRING(100),
    token:STRING(100),
    lastvisit:STRING(20),
  });

  return User;
};