const express = require('express');
const router = express.Router();
const Job = require('../models/Job');

// Detalhe da vaga
router.get('/view/:id', (req, res) => {
    Job.findOne({ where: { id: req.params.id } })
        .then(job => res.render('view', { job }))
        .catch(err => console.log(err));
});

// Página para adicionar vaga
router.get('/add', (req, res) => {
    res.render('add');
});

// Adicionar vaga (POST)
router.post('/add', (req, res) => {
    const { title, description, salary, company, email, new_job } = req.body;

    Job.create({ title, description, salary, company, email, new_job })
        .then(() => res.redirect('/'))
        .catch(err => console.log(err));
});

module.exports = router;
