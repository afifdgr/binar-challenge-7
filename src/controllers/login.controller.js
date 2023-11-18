const { PrismaClient } = require('@prisma/client'),
 prisma = new PrismaClient(),
 hash = require('../utils/hashData'),
 jwt = require('../utils/jwt')

module.exports = {
    index: async (req, res) => {
        try {
            return res.render('login');
        } catch (error) {
            console.log(error);
            return res.render('error', {
                message: 'Internal server Error'
            });
        }
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.render('error', {
                    message: 'Email and password are required'
                });
            }

            const user = await prisma.users.findUnique({
                where: {
                    email: email
                }
            });

            if (!user) {
                return res.render('error', {
                    message: 'Invalid email or password'
                });
            }

            const passwordMatch = await hash.verify(password, user.password);

            if (!passwordMatch) {
                return res.render('error', {
                    message: 'Invalid email or password'
                });
            }

            const payload = { id: user.id , email: user.email}
            const token = jwt.create(payload); 

            return res.render('success', {
                message: 'Login successful'
            });

        } catch (error) {
            console.log(error);
            return res.render('error', {
                message: 'Internal Server Error'
            });
        }
    },
};
