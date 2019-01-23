
const express = require('express');
const app = express();
const fs = require('file-system');
const nopath = "C:/Users/onewe/Desktop/raw/testtiles/no.png";

app.get('/tile/:z/:x/:y', function (req, res) {
	console.log(req.path);
	let px = parseInt(req.params.x);
	let py = parseInt(req.params.y);
	let zoom = parseInt(req.params.z);
	let path = zoom + "/" + px + "/" + py;
	if (fs.existsSync(path)) {
		console.log(path);
		res.sendFile(path);
	}
	else {
		console.log(nopath);
		res.sendFile(nopath);
	}
})

app.listen(3000, function () {
	console.log('Tile serving app listening on port 3000!')
});

