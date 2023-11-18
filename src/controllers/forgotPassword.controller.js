const {PrismaClient} = require('@prisma/client'),
    prisma = new PrismaClient(),
    hash = require('../utils/hashData'),
    transporter = require('../utils/transporter');

module.exports = {
    index: async (req, res) => {
        try {
            return res.render('forgot-password.ejs')
        } catch (error) {
            console.log(error)
        }
    },

    sendLink: async(req, res) => {
        try {
            const { email } = req.body

            const createTransporter = transporter.create()
            await createTransporter.verify()

            const user = await prisma.users.findFirst({
              where: {
                email: email,
              },
            });

            if (!user) {
              return res.render("error");
            }

            const hashData = await hash.create(email)
      
            await prisma.users.update({
              data: {
                resetPasswordToken: hashData,
              },
              where: {
                id: user.id,
              },
            });
             
            const mailOptions = {
              from: "Admin",
              to : email,
              subject: 'Reset-Password',
              html: `<p style="color: tomato; font-size:25px; letter-spacing: 2px;"> Reset Password <a href="http://localhost:3000/set-password/${hashData}">click here </a></p>`
            }

            await transporter.send(mailOptions, (error) => {
                if(error){
                    return res.render("error", { message: 'Internal Server Error' });
                  }
                  return res.render("success", { message: 'Check your email!' });
            });
            
          } catch (error) {
            console.log(error);
            return res.render("error", { message: 'Internal Server Error' });
          }
        },
}