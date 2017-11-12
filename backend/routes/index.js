
const Sequelize = require('sequelize');
const postgres = 'postgres://readonly_user:turner@aws-us-east-1-portal.27.dblayer.com:25183/titles'

module.exports = (app)=>{
  
  app.get('/titles', (req, res)=> {
    //create a sequelize instance
    const sequelize = new Sequelize(postgres);
    sequelize.query("SELECT * FROM title", { type: sequelize.QueryTypes.SELECT})
    .then(data=>{ // then repond with the data and close out the connection
      res.send(data)
      sequelize.close()
    })
  });

  app.post('/titles/details',(req, res)=>{
    //same principle as above but this post takes a parameter called id in the body request
    //TODO: improve payload handeling on both ends of app
    if(!req.body.id){
      res.sendStatus(400)
    }
    else{
    const sequelize = new Sequelize(postgres);
    sequelize.query(
      "SELECT DISTINCT ON (1)    description, type, language, name FROM storyline,title_genre, genre WHERE storyline.title_id =:id AND  title_genre.title_id= :id  AND genre.id = title_genre.genre_id AND storyline.type = 'Turner External'"
      ,
    { replacements: { id: req.body.id } // this must be passed
    ,type: sequelize.QueryTypes.SELECT }
    ).then(data=>{
        res.send(data)
        sequelize.close()
    }).catch(err => {
      console.error(err)
      res.sendStatus(500)
    });
  }
    })
};
