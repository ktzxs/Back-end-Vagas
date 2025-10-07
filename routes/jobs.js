import express from 'express';
const router = express.Router();
import Job from '../models/Job.js';

router.get('/add', (req, res) => {
    res.render('add');
})

router.post('/add', (req, res) => {
    let { title, description, salary, company, email, new_job  } = req.body;

    Job.create({
       title,
       description,
       salary,
       company,
       email,
       new_job
    })

    .then(() => res.redirect('/'))
    .catch(err => console.log(err));
});

export default router;