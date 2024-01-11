import express from "express";
import handlebars from "express-handlebars";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import { router as viewsRouter } from "./routes/views.routes.js";
import passport from "passport";
import { initializedPassport } from "./config/passport.config.js";
import { __dirname } from "./utils.js";
import config from "./config/config.js";
import cors from 'cors';
import MainRouter from "./routes/index.routes.js";
const mainRouter = new MainRouter()
const { connectionString, PORT } = config

const app = express();
// Conectar a la base de datos
mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log("Conectado a la base de datos");
    })
    .catch((error) => {
        console.error("Error al conectar a la base de datos: " + error);
        process.exit(1);
    });

const mongoStoreOptions = {
    store: MongoStore.create({
        mongoUrl: connectionString,
        ttl: 120,
        crypto: {
            secret: '1234'
        }
    }),
    secret: '1234',
    resave: false,
    saveUninitialized: false
};
//const port = process.env.PORT || 8080;
const port = PORT || 8080;

app.listen(port, () => { console.log(`El server funcionando en puerto ${port}`) });
app.use(express.static(__dirname + "/public"));
app.engine("handlebars", handlebars.engine({
    defaultLayout: 'main',
    extname: '.handlebars',
    runtimeOptions: {
        allowProtoMethodsByDefault: true,
        allowProtoPropertiesByDefault: true,
    },
}))
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

// Configuración de express-session y passport antes de las rutas
app.use(session(mongoStoreOptions));
initializedPassport();
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());


app.use('/', viewsRouter);
app.use('/api/', mainRouter.getRouter());

app.get('/', (req, res) => {
    res.send('Welcome !!');
})