
const Sequelize = require('sequelize');




module.exports = (app)=>{
  app.get('/titles', (req, res)=> {
    const sequelize = new Sequelize('postgres://readonly_user:turner@aws-us-east-1-portal.27.dblayer.com:25183/titles');
    sequelize.query("SELECT * FROM title", { type: sequelize.QueryTypes.SELECT})
    .then(data=>{
      res.send(data)
      sequelize.close()
    })
  });

  app.post('/titles/details',(req, res)=>{
    const sequelize = new Sequelize('postgres://readonly_user:turner@aws-us-east-1-portal.27.dblayer.com:25183/titles');
    sequelize.query(
      "SELECT DISTINCT ON (1)    description, type, language, name FROM storyline,title_genre, genre WHERE storyline.title_id =:id AND  title_genre.title_id= :id  AND genre.id = title_genre.genre_id AND storyline.type = 'Turner External'"
      ,
    { replacements: { id: req.body.id },type: sequelize.QueryTypes.SELECT }
    ).then(data=>{
        res.send(data)
        sequelize.close()
    }).catch(err => {
      console.error(err)
      res.sendStatus(500)
    });
  })
};
