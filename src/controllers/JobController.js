const Job = require('../model/Job')
const JobUtils = require('../utils/JobUtils')
const Profile = require('../model/Profile')

module.exports = {
    create(req, res) {
        return res.render("job")
    },

    async save(req, res) {

        await Job.create({
            name: req.body.name,
            "daily-hours": req.body["daily-hours"],
            "total-hours": req.body["total-hours"],
            created_At: Date.now() //Atribuindo ao created_At a data de hj
        })

        return res.redirect('/')
    },

    async show(req, res) {
        const jobs = await Job.get();
        const JobId = req.params.id

        const job = jobs.find(job => Number(job.id) === Number(JobId))
            
        if (!job){
            return res.send('Job not Found - Job não Encontrado !')
        }

        const profile = await Profile.get();

        job.budget = JobUtils.calculateBudget(job, profile["value-hour"])

        return res.render("job-edit", { job })
    },

    async update(req, res) {
        
        const JobId = req.params.id

        const updatedJob = {
            name: req.body.name,
            "total-hours": req.body["total-hours"],
            "daily-hours": req.body["daily-hours"],
        }

        await Job.update(updatedJob, JobId) 
            
        res.redirect('/job/' + JobId)

    },

    async delete(req, res) {
        const JobId = req.params.id

        await Job.delete(JobId)

        return res.redirect('/')

    }
}