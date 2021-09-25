module.exports = {

    remainingDays(job) {

        const remainingDays = (job["total-hours"] / job["daily-hours"]).toFixed() //total de dias 
        
        const createdDate = new Date(job.created_At) //data de criação do job

        const dueDay = createdDate.getDate() + Number(remainingDays) //dias de entrega do job
        
        const dueDateInMs = createdDate.setDate(dueDay) //data futura de vencimento
        
        const timeDiffInMs = dueDateInMs - Date.now() //Data de vencimento - a data atual
        
        const daysInMs = 1000 * 60 * 60 * 24 //transformar millisegundos em dias
            
        const DayDiff = Math.floor(timeDiffInMs / daysInMs) //dias restantes
        
       
        return DayDiff  //restam x dias
        
    },

    calculateBudget: (job, valueHour) => valueHour * job["total-hours"]

}