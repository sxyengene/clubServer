module.exports = app => {
  const { STRING, INTEGER ,TEXT} = app.Sequelize;
  // Object.keys(app.Sequelize).forEach((v)=>{console.log(v)});
  const Comment = app.model.define('comment', {
    courseid:INTEGER(11),
    userid:INTEGER(11),
    content:TEXT,
    valid:INTEGER(11),
    commenttime:STRING(20),
    id: {
      type: INTEGER(11),
      primaryKey: true,
    },
  });

  return Comment;
};
