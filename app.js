
const express = require('express');
const app = express();
const fs = require('file-system');
const nopath = "C:/Users/onewe/Desktop/raw/testtiles/no.png";

app.get('/tile/:z/:x/:y', function (req, res) {
	console.log(req.path);
	let px = parseInt(req.params.x);
	//let xtile = Math.floor(px / 2);
	let py = parseInt(req.params.y/*.substring(0, req.params.y.length - 4)*/);
	//console.log(req.params.y);
	//let ytile = Math.floor(py / 2);
	let zoom = parseInt(req.params.z);
	//let path = "C:/Users/onewe/Desktop/raw/testtiles/" + zoom + "/" + xtile + "/" + ytile + ".png";
	let path = "C:/Users/onewe/Desktop/raw/testtiles/" + zoom + "/" + px + "/" + py + ".png";
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

