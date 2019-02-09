module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const Sign = app.model.define('sign', {
    courseid: INTEGER(11),
    userid: INTEGER(11),
    signtime: STRING(20),
    id: {
      type: INTEGER(11),
      primaryKey: true,
    },
  });

  return Sign;
};
