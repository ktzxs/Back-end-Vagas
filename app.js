import express from 'express';
import { engine } from 'express-handlebars';
import db from './db/connection.js';
import bodyParser from 'body-parser';
import jobsRoutes from './routes/jobs.js';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

const PORT = 3000;

app.listen(PORT, function () {
    console.log(`O express está rodando na porta http://localhost:${PORT}`)
});

app.use(bodyParser.urlencoded({ extended: false }));

//handlebars
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

//static folder
app.use(express.static(path.join(__dirname, 'public')));

db
    .authenticate()

    .then(() => {
        console.log('Conectou ao banco com sucesso')
    })

    .catch(err => {
        console.log('Ocorre um erro ao conectar', err);
    });

app.get('/', (req, res) => {
    res.render('index');
});

app.use('/jobs', jobsRoutes);