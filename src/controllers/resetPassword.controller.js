const {PrismaClient} = require('@prisma/client'),
    prisma = new PrismaClient(),
    hash = require('../utils/hashData');

module.exports = {
    
    index: async (req, res) => {
        try {
            return res.render('reset-password.ejs')
        } catch (error) {
            console.log(error)
        }
    },

    resetPassword: async(req, res) => {
        try {
            const { token, password } = req.body
            const user = await prisma.users.findFirst({
                where: {
                    resetPasswordToken: token
                }
            })

            if(!user){
                return res.render('error', {
                    message: 'invalid token'
                })
            }

            const hashPassword = await hash.create(password)

            await prisma.users.update({
                data: {
                    password: hashPassword,
                    resetPasswordToken: null
                },
                where:{
                    id: user.id
                }
            })

            return res.render('success', {
                message: "Reset Password Sucessfully",
            })

        } catch (error) {
            console.log(error.message)
            return res.render('error', {
                message: 'internal server error.'
            })
        }
    },
}