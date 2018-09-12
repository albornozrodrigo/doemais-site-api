const model = require('./model');

this.getAll = async () => {
	try {
		return await model.find();
	} catch(err) {
		err.error = true;
		return err;
	}
}

this.getByGeolocation = async (coordinates, distance) => {
	try {
		return await model.find({
			"address.location": {
				"$near": {
					"$geometry":{
						"type": "Point",
						"coordinates": [ coordinates.lng, coordinates.lat ]
					},
					"$maxDistance": distance * 1000
				}
			}
		});
	} catch(err) {
		err.error = true;
		return err;
	}
}

this.create = async (bloodCenter) => {
	try {
		return await model.create(bloodCenter);
	} catch(err) {
		console.log(err);
		err.error = true;
		err.errorMessage = 'Erro ao inserir os dados, verifique os campos e tente novamente.'
	}
}

module.exports = this;
