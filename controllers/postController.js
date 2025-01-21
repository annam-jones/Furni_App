import express from 'express';
import Furniture from '../models/furniture.js';
import multer from 'multer';
import methodOverride from 'method-override';

const router = express.Router();

router.use(methodOverride('_method'));

function handleError(error, res) {
    console.log(error);
    if (error.name === 'CastError') {
        res.status(400).send({ message: "Hello! This ID is not valid, please provide a valid ID!" });
    } else {
        res.status(500).send({ message: "Something went wrong. Please check your request and try again!" });
    }
}


const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 1 * 1024 * 1024 }, 
});


router.get('/', (req, res) => {
    res.render("pages/homepage.ejs");
});

router.get('/error', (req, res) => {
    res.render("error.ejs");
});

router.get('/post', (req, res) => {
    try {
        res.render('pages/new.ejs');
    } catch (error) {
        handleError(error, res);
    }
});


router.get('/show/:id', async (req, res) => {
    try {
        const furnitureId = req.params.id;
        const furniture = await Furniture.findById(furnitureId);

        if (!furniture) {
            return res.status(404).send({ message: "Furniture not found." });
        }

        res.render("pages/show.ejs", { furniture });
    } catch (error) {
        handleError(error, res);
    }
});


router.get('/pages/update/:id', async (req, res) => {
    try {
        const furnitureID = req.params.id;
        const furniture = await Furniture.findById(furnitureID);

        if (!furniture) {
            return res.status(404).send({ message: "Furniture not found." });
        }

        res.render('pages/update.ejs', { furniture });
    } catch (error) {
        handleError(error, res);
    }
});



router.put('/pages/update/:id', upload.single("image"), async (req, res) => {
    try {
        const { name, description } = req.body;
        const furnitureID = req.params.id;

        const updateData = { postName: name, description };

    
        if (req.file) {
            const base64Image = req.file.buffer.toString("base64");
            updateData.image = base64Image;
        }

        const updatedFurniture = await Furniture.findByIdAndUpdate(
            furnitureID,
            updateData,
            { new: true }
        );

        if (!updatedFurniture) {
            return res.status(404).send({ message: "Furniture not found." });
        }

        res.redirect(`/show/${furnitureID}`);
    } catch (error) {
        handleError(error, res);
    }
});

router.get('/index/furniture-by-name/:name', async (req, res, next) => {
    try {
        const furnitureName = req.params.name;

        const furniture = await Furniture.findOne({
            postName: { $regex: new RegExp(`^${furnitureName}$`, 'i') }
        });

        if (!furniture) {
            return res.status(404).send({ message: "Furniture not found." });
        }

        res.send(furniture);
    } catch (error) {
        next(error);
    }
});

router.get('/index', async (req, res) => {
    try {
        const furniture = await Furniture.find();
        res.render("pages/index.ejs", { furniture });
    } catch (error) {
        handleError(error, res);
    }
});

router.post('/post', upload.single("image"), async (req, res) => {
    try {
        const { postName, description } = req.body;

        if (!postName || !description || !req.file) {
            return res.status(400).send("Furniture name, description, and image are required.");
        }

        const base64Image = req.file.buffer.toString("base64");

        const newFurniture = new Furniture({
            postName,
            description,
            image: base64Image,
        });

        await newFurniture.save();

        res.redirect("/index");
    } catch (error) {
        handleError(error, res);
    }
});

router.delete('/pages/index/:id', async (req, res) => {
    try {
        const id = req.params.id;

        
        const furniture = await Furniture.findById(id).populate('user');

        console.log("Furniture:", furniture);
        console.log("Furniture User:", furniture?.user);
        console.log("Session User:", req.session.user);

        if (!furniture) {
            return res.status(404).send({ message: "Item doesn't exist" });
        }

      if (!furniture.user._id.equals(req.session.user._id)) {
            return res.status(403).send({ message: "This is not your item to delete!" });
        }

      await Furniture.findByIdAndDelete(id);

      res.redirect('/index');
    } catch (error) {
        handleError(error, res);
    }
});


export default router;

