const { PrismaClient } = require('@prisma/client'),
 prisma = new PrismaClient(),
 hash = require('../utils/hashData');

module.exports = {
    index: async (req, res) => {
        try {
            return res.render('register');
        } catch (error) {
            console.log(error);
            return res.render('error', {
                message: 'Internal server Error'
            });
        }
    },

    register: async (req, res) => {
        try {
            const { email, name, password } = req.body;

            if (!email || !name || !password) {
                return res.render('error', {
                    message: 'Email, name, and password are required'
                });
            }

            const existingEmail = await prisma.users.findFirst({
                where: {
                    email: email
                }
            });

            if (existingEmail) {
                return res.render('error', {
                    message: 'Email is already registered'
                });
            }

            const hashPassword = await hash.create(password);

            const user = await prisma.users.create({
                data: {
                    name: name,
                    email: email,
                    password: hashPassword
                }
            });

            return res.render('success', {
                message: 'Registration successful'
            });

        } catch (error) {
            console.log(error);

            return res.render('error', {
                message: 'Internal Server Error'
            });
        }
    },
};
