// variables para funcionalidad del serividor Node JS + Express JS
var express = require('express'),
	mongoose = require('mongoose'),
	bodyParser = require('body-parser'),
	multer = require('multer'),
	cloudinary = require('cloudinary'),
	method_override  = require('method-override'),
	cookieParser = require('cookie-parser'),
	session = require('express-session'),
	fileUpload = require('express-fileupload'),
	portHttps = 3000,
	portHttp= 80,
	//port = 443
	app = express();
	compression = require('compression');
	fs = require('fs');
	path = require('path');
	https = require('https');
	http = require('http');


https.createServer({
    key: fs.readFileSync('./public/ssl/key.pem'),
    cert: fs.readFileSync('./public/ssl/cert.pem'),
    passphrase: 'llaos2019'
}, app).listen(portHttps);

//http.createServer(app).listen(portHttps);
	
require('mongoose-double')(mongoose);

// Eliminar mensaje deprecation warning
mongoose.Promise = global.Promise;

const dbConCloud = "mongodb://llaos-bd:%40Llaos2019@llaos-serv-shard-00-00-y0xgc.gcp.mongodb.net:27017,llaos-serv-shard-00-01-y0xgc.gcp.mongodb.net:27017,llaos-serv-shard-00-02-y0xgc.gcp.mongodb.net:27017/llaosserv?ssl=true&replicaSet=llaos-serv-shard-0&authSource=admin&retryWrites=true"
const dbConLocal = "mongodb://localhost:27017/llaosserv";

// Producción
//mongoose.connect(dbConCloud,  { useNewUrlParser: true , useUnifiedTopology: true});

mongoose
.connect(dbConCloud, {
	useUnifiedTopology: true,
	useNewUrlParser: true,
})
.then(() => console.log('DB Connected!'))
.catch(err => {
	console.log('DB Connection Error:' `${err.message}`);
});

// Dev
//mongoose.connect(dbConLocal,  { useNewUrlParser: true });

// Indicar a express que el motor visual será JADE/PUG
app.set("view engine","jade");

// Usos de expresss, utilizar bodyparser y carpetas publicas
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(session({
	secret: "123byuhbsdah12ub",
    resave: false,
    saveUninitialized: true
}));
app.use(method_override("_method"));
app.use(express.static("public"));
app.use(express.static('files'));
app.use(fileUpload());
app.use(compression());
app.locals._      = require('underscore');
app.locals._.str  = require('underscore.string');
app.locals.moment = require('moment');


/* Middleware para manejo de errores */
app.use( (err, solicitud, respuest, next) => {
	res.status(500);
	res.json({
	  "error": `${err}`
	});
});

/* Importaciones de modelos */
require('./config/models/Usuarios');
require('./config/models/Proveedores');
require('./config/models/Productos');
require('./config/models/Requisiciones');
require('./config/models/RequisicionesOld');
require('./config/models/Ordenes');
require('./config/models/OrdenesOld');
require('./config/models/Cotizaciones');
require('./config/models/Inventarios');
require('./config/models/Empleados');
require('./config/models/Errores');
require('./config/models/Puestos');
require('./config/models/Tickets');
require('./config/models/Evaluaciones');
require('./config/models/Objetivos');
require('./config/models/TiposCamaron');
require('./config/models/InventariosCamaron');
require('./config/models/Zooplancton');
require('./config/models/NutrientesTox');
require('./config/models/Estanques');
require('./config/models/Patologicos');
require('./config/models/Bacteriologia');
require('./config/models/Fitoplancton');
require('./config/models/Parametros');
require('./config/models/Nutricion');
require('./config/models/Laboratorios');
require('./config/models/RecepcionLarva');
require('./config/models/Unidades');
require('./config/models/UnidadesNegocio');

/* Importación de clase que contiene todas las rutas */
require('./config/routes')(app);

/***************/
/* CURRICULUM */
	app.get("/empresa/curriculum", function(solicitud, respuesta){
		respuesta.render("CV/index");
	});
/***************/

/*** PRUEBAAS */

	app.get("/prueba", function(solicitud, respuesta){
		respuesta.render("Prueba/pruebita",
			{
				user: solicitud.session.user
			}
		);
	});

/** */