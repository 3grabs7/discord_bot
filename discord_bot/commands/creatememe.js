const fetch = require('node-fetch');
const path = require('path');

module.exports = function (msg, args) {
	if (!args) {
		msg.reply('no img uploaded');
	} else {
		const http = require('https');
		let token = ' ';
		const options = {
			method: 'POST',
			hostname: 'api.sirv.com',
			path: '/v2/token',
			headers: {
				'content-type': 'application/json',
			},
		};
		const clientId = 'HXIgZwV4kRP6NH3nnSRr4AQ6BRZ';
		const clientSecret =
			'KbeglfeGnssK7btwZ5s/wCPGIJB+Qg7UPmh4THQ/ETvIA6S8ZM/h9PE0D79zqyNY3WF1VaOyFKVUulHYATSqXg==';
		const req = http.request(options, (res) => {
			const chunks = [];

			res.on('data', (chunk) => {
				chunks.push(chunk);
			});

			res.on('end', () => {
				const body = Buffer.concat(chunks);
				const apiResponse = JSON.parse(body.toString());
				getImage(apiResponse.token);
			});
		});
		req.write(
			JSON.stringify({
				clientId,
				clientSecret,
			})
		);
		req.end();
		msg.reply('Picture is now uploaded');
	}

	function getImage(token, err) {
		pathFile = args[0];
		const pathToFile = path.join(
			__dirname,
			`../uploadedimgs`,
			`${pathFile}.jpg`
		);

		console.log(pathToFile);

		const fs = require('fs');
		const http = require('https');

		//denna vill vi ha args[0] till.
		//'C:/Users/cbchr/Desktop/old pictures/doglel.jpg';
		fs.readFile(pathToFile, (err, fileData) => {
			let options = {
				method: 'POST',
				hostname: 'api.sirv.com',
				port: null,
				path: `/v2/files/upload?filename=%2Fpath%2Fto%2F${pathFile}.jpg`,
				headers: {
					'content-type': 'application/json',
					authorization: `Bearer ${token}`,
				},
			};
			let req = http.request(options);
			req.write(fileData);
			req.end();
		});
		console.log(`Token : ${token}`);
	}

	msg.reply({
		files: [
			{
				attachment: `https://abinkpoo.sirv.com/path/to/${args[0]}.jpg?text=${args[1]}&text.color=FFFFFF&text.font.weight=extra-bold&text.font.size=28&text.position.gravity=center&text.position.y=50`,
				name: 'file.png',
			},
		],
	});
};

//Tar in url samt en text för att då skapa en meme.
//module.exports = async (msg, args) => {
//	msg.channel.send(`https://demo.sirv.com/oman.jpg?text=Overlay text here!`);
//};