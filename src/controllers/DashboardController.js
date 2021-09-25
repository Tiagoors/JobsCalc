const Job = require('../model/Job')
const Profile = require('../model/Profile')
const JobUtils = require('../utils/JobUtils')

module.exports = {
  async index(req, res) {

    const jobs = await Job.get();
    const profile = await Profile.get();

    let statusCount = {
      progress: 0,
      done: 0,
      total: jobs.length
    }

    //total de horas por dia de cada Job em progress
    let jobTotalHours = 0

    const UpdatedJobs = jobs.map((job) => { //ajustes nos dados do job

      const remaining = JobUtils.remainingDays(job) 
      const status = remaining <= 0 ? "done" : "progress"

      statusCount[status] += 1; //somando a quantidade de status
      
      //total de horas por dia de cada Job em progress
      jobTotalHours = status == 'progress' ? jobTotalHours + Number(job['daily-hours']) : jobTotalHours

      return {
        ...job,
        remaining,
        status,
        budget: JobUtils.calculateBudget(job, profile["value-hour"])
      }

    })

    // Quantidade de horas que quero trabalhar por dia (PROFILE) MENOS quantidade de horas/dia de cada job em progress
    const freeHours = profile["hours-per-day"] - jobTotalHours;

    return res.render("index", { jobs: UpdatedJobs, profile: profile, statusCount: statusCount, freeHours: freeHours})
  }
}