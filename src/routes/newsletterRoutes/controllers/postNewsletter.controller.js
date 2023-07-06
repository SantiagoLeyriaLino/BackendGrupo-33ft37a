const {sendNewsletter} = require('../../../services/nodeMailer')

const newsletter = async (req, res) => {
    //Take the price per body
    console.log('entre acaaaa')
    const { email } = req.body;

    if (!email) return res.status(400).json({
        status: 400, error: "The amount field is required"
    })

    if (email === "") return res.status(400).json({
        status: 400, error: "The amount field is required"
    })


    // if (isNaN(amount)) return res.status(400).json({
    //     status: 400, error: "The amount field must be an integer"
    // })
    await sendNewsletter(email)
    console.log('ok')
}

module.exports = newsletter