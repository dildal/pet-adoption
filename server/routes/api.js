const Animal = require('../../models/animal'),
	  express = require('express'),
	  router = express.Router();

// =======================
// Animals API
// =======================
router.get('/animals', async function(req, res){
	try{
		var animals = await Animal.find();

		return res.status(200).json({status: 200, data: animals, message: "Animals successfully retrieved"});
	} catch(e){
		return res.status(400).json({status: 400, message: e.message});
	}
});

router.get('/animals/:id', async function(req, res){
	try{
		var animal = await Animal.find({_id: req.params.id});

		return res.status(200).json({status: 200, data: animal, message: 'Animal successfully retrieved'});
	} catch(e){
		return res.status(400).json({status: 400, message: e.message});
	}
})


router.post('/animals', async function(req, res){
	var newAnimal = new Animal({
		name: req.body.name,
		type: req.body.type,
		picture: req.body.picture,
		age: req.body.age,
		sex: req.body.sex,
		fixed: req.body.fixed,
		bio: req.body.bio,
		available: true,
		shots: req.body.shots
	});

	try {
		var savedAnimal = await newAnimal.save();
		return res.status(201).json({status: 201, data: savedAnimal, message: 'Animal created successfully'});
	} catch(e){
		return res.status(400).json({status: 400, message: e.message});
	}
});

router.put('/animals/:id', async function(req, res){
	//find cat
	try{
		var animalToUpdate = await Animal.findById(req.params.id);
	} catch(e){
		throw new Error("Failed to find animal");
	}

	animalToUpdate.name = req.body.name;
	animalToUpdate.type = req.body.type;
	animalToUpdate.age = req.body.age;
	animalToUpdate.sex = req.body.sex;
	animalToUpdate.fixed = req.body.fixed;
	animalToUpdate.bio = req.body.bio;
	animalToUpdate.available = req.body.available;
	animalToUpdate.picture = req.body.picture;
	animalToUpdate.shots = req.body.shots;

	try{
		var updated = await animalToUpdate.save();
		return res.status(200).json({status: 200, data: updated, message: 'Animal updated successfully'});
	} catch(e){
		return res.status(400).json({status: 400, message: e.message});
	}
});

router.delete('/animals/:id', async function(req, res){

	try {
		var deleted = await Animal.remove({_id: req.params.id});
		return res.status(204).json({status:204, message: 'Animal successfully deleted'});
	} catch(e){
		return res.status(400).json({status: 400, message: e.message});
	}
});




module.exports = router;

