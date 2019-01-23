
const express = require('express');
const app = express();
const fs = require('file-system');
const assert = require('assert');
const hbase = require('hbase');
const nopath = __dirname + "/no.png";
//8/381/92
app.get('/tile/:z/:x/:y', function (req, res) {
	console.log(req.path);
	let px = parseInt(req.params.x);
	let py = parseInt(req.params.y);
	let zoom = parseInt(req.params.z);
	let path = zoom + "/" + px + "/" + py;
	hbase({ host: 'young', port: 9000 })
	.table('PascalTestTiles')
	.row(path)	
	.get('File:Tile', (error, value) => {
		console.info(value);
	});
	/*if (fs.existsSync(path)) {
		console.log(path);
		res.sendFile(path);
	}
	else {
		console.log(nopath);
		res.sendFile(nopath);
	}*/
})

app.listen(3000, function () {
	console.log('Tile serving app listening on port 3000!')
});

