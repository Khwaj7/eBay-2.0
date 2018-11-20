//// Initialisation serveur

//// packages

// Utilisation de express pour publier l'API
var express = require('express');
var app = express();

// Utilisation de mongoDB pour le stockage des informations
var mongoose = require('mongoose');

// Définition des schémas pour utiliser mongo
var Schema = mongoose.Schema;

// utilisation de bodyParser pour récupérer les données d'un POST par exemple
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

//// connexion à la base de données mongoDB

var url = 'mongodb://localhost:27017/android';
var options = {
  useNewUrlParser: true
};

mongoose.connect(url, options, function(error) {
  if (error) {
    console.log(error);
  }
  console.log("Connexion réussie !");
});
var db = mongoose.connection;

//// Port qui sera utilisé pour l'API REST
var port = 8080;


//// Création des routes

// Récupération d'un routeur
var router = express.Router();

// Fonction de log des routes pour info ou debug
router.use(function(req, res, next) {
  console.log("\t" + req.method + " " + req.url);

  // Pour ne pas s'arreter à cette méthode mais continuer sur les prochaines
  next();
});

// Définition de la route pour "/"
router.get('/', function(req, res) {
  res.json({
    message: "bonjour-in"
  })
})

// Définition de la route pour "/users"
router.route('/users')
  .post(function(req, res) {
    var reponse = {
      message: "BD non implemente"
    };

    res.status(501);
    res.json(reponse);

    console.log("Status code : 501");
    console.dir(reponse);
  });

// Définition de la route pour "/annonces"
router.route('/annonces')
  .get(function(req, res){
    var reponse = [
      {
      	"nom":"annonce 1",
      	"description":"ceci est la première annonce et elle est bien",
      	"prix_min": 0.01,
      	"dateCreation": "2018-01-01 00:00:01",
      	"duree": 5,
      	"photo":"https://www.och.fr/sites/default/files/envoyez-nous_votre_annonce.jpg",
      	"etat":"active",
      	"derniereEnchere": 1000.01,
      	"utilisateurEnchere":"Philippe RG"
      },
      {
      	"nom":"annonce 2",
      	"description":"ceci est une annonce encore mieux",
      	"prix_min": 10.00,
      	"dateCreation": "2018-11-01 12:35:56",
      	"duree": 5,
      	"photo": "https://aae-fgi.org/sites/default/files/field/annonce/annonce_2.jpg",
      	"etat":"active",
      	"derniereEnchere": 10.01,
      	"utilisateurEnchere":"Philippe RG 2"
      }
    ]

    res.json(reponse);

    console.log("Status code : 200");
    console.dir(reponse);
  });


// Utilisation du routeur pour toutes les routes qui commencent pas "/"
app.use('/', router);

//// Lancement de l'application
app.listen(port);
console.log('Go on localhost:' + port + ' !');