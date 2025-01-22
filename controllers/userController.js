import express from 'express';
import User from '../models/user.js';

const router = express.Router();

function handleError(error, res) {
    console.log(error);
    res.status(400).send({ message: error.message });
}


router.route('/signup').get((req, res) => {
    res.render('user/signUp.ejs');
});

router.route('/login').get((req, res) => {
    res.render('user/login.ejs')  
});

        
router.route('/signup').post(async function (req, res) {
    try { 
        const { password, confirmPassword } = req.body;

        
        if (password !== confirmPassword) {
            return res.status(400).send({
                message: 'Passwords do not match.'
            });
        }

        
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
        if (!passwordRegex.test(password)) {
            return res.status(400).send({
                message: 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one symbol.'
            });
        }

       
        const newUser = await User.create(req.body);
        res.redirect('/login');
    } catch (error) {
        console.error('Error creating user:', error.message);
        handleError(error, res);
    }
});

router.route("/user/logout").get(async function (req, res, next) {
  req.session.destroy();
  res.redirect("/");
});

router.get('/login', (req, res, next) => {
    try {
      res.render("user/login.ejs");
    } catch (error) {
      next(error, res)
    }  
  })

  router.post('/login', async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });

   
        if (!user || !(await user.isPasswordValid(req.body.password))) {
            return res.status(401).send({ message: "Unauthorized" });
        }

        req.session.user = {
            _id: user._id,
            username: user.username,
        };

        res.redirect('/');
    } catch (error) {
        handleError(error, res);
    }
});
export default router;