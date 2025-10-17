const express = require('express');
const { engine } = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./db/connection');
const jobsRoutes = require('./routes/jobs');
const Job = require('./models/Job');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const app = express();
const PORT = 3000;

// Body parser
app.use(bodyParser.urlencoded({ extended: false }));

// Handlebars
app.engine('handlebars', engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Static folder
app.use(express.static(path.join(__dirname, 'public')));

// Banco de dados
db.authenticate()
    .then(() => console.log('Conectou ao banco com sucesso'))
    .catch(err => console.log('Ocorreu um erro ao conectar', err));

// Rotas
app.get('/', (req, res) => {
    const search = req.query.job;
    const query = `%${search || ''}%`;

    const findOptions = { order: [['createdAt', 'DESC']] };
    if (search) findOptions.where = { title: { [Op.like]: query } };

    Job.findAll(findOptions)
        .then(jobs => res.render('index', { jobs, search }))
        .catch(err => console.log(err));
});

app.use('/jobs', jobsRoutes);

// Servidor
app.listen(PORT, () => {
    console.log(`O Express está rodando na porta http://localhost:${PORT}`);
});
