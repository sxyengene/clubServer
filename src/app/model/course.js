module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;
  // Object.keys(app.Sequelize).forEach((v)=>{console.log(v)});
  const Course = app.model.define('course', {
    coursename: STRING(50),
    coursetime: INTEGER(11),
    id: {
      type: INTEGER(11),
      primaryKey: true,
    },
    name: {
      type: STRING(50),
    },
    meeting: STRING(50),
    floor: INTEGER(50),
  });

  return Course;
};
