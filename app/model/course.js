module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;
  // Object.keys(app.Sequelize).forEach((v)=>{console.log(v)});
  const Course = app.model.define('course', {
    coursename: STRING(50),
    coursetime: INTEGER(11),
    id: INTEGER(11),
    name: {
      type:STRING(50),
      primaryKey:true
    }
  });

  return Course;
};
