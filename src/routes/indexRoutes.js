const {Router} = require("express");

const usersRoutes = require('./UsersRoutes/indexUsers')

const router = Router()

router.use('/users', usersRoutes)



module.exports = router