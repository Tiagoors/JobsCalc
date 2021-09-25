const Profile = require('../model/Profile')

module.exports = {
    async index (req, res) {
        return res.render("profile", {profile: await Profile.get() })
    },

    async update (req, res) {

        // req.body pegar os dados
        const data = req.body
        
        // Definir quantas semanas tem um ano: 52
        const weeksPerYear = 52

        // Remover suas semanas de férias do ano, para pegar quantas semanas tem em um mês
        const weeksPerMonth = (weeksPerYear - data['vacation-per-year']) / 12
        
        // total de horas trabalhadas na semana 
        const weekTotalHours = data['hours-per-day'] * data['days-per-week']

        // horas trabalhadas no mẽs
        const MonthlyTotalHours = weekTotalHours * weeksPerMonth

        //valor da minha hora
        const valueHour = data['monthly-budget'] / MonthlyTotalHours

        const profile = await Profile.get()

        await Profile.update({
            ...profile,
            ...req.body,
            "value-hour": valueHour
        })

        return res.redirect('/profile')
    }
}