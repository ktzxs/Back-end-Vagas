import Sequelize from 'sequelize';
import db from '../db/connection.js';

const Job = db.define('Job', {
    title: {
        type: Sequelize.STRING,
    },

    description: {
        type: Sequelize.STRING,
    },
    
    salary: {
        type: Sequelize.STRING,
    },

    company: {
        type: Sequelize.STRING,
    },

    email: {
        type: Sequelize.STRING,
    },

    new_job: {
        type: Sequelize.INTEGER,
    },
});

export default Job;
