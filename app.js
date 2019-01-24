const express = require('express');
const hbase = require('hbase');
const fs = require('file-system');
const convertHex = require('convert-hex');
const utf8 = require('utf8');
const nopath = __dirname + "/no.png";
const canard = __dirname + "/canard.jpg";
//8/253/67

const app = express();

client = hbase({ host: '0.0.0.0', port: 8080 });

app.get('/home', function(req, res) {
  res.send('Welcome to our custom-map-tiles-serving-rest API');
});

function unpack(str) {
	let bytes = [];
	for (let i = 0, n = str.length ; i < n ; i++) {
		let char = str.charCodeAt(i);
		bytes.push(char >>> 8, char & 0xFF);
	}
	return bytes;
}

app.get('/tile/:z/:x/:y', function(req, res){
  let x = req.params.x;
  let y = req.params.y;
  let z = req.params.z;
  let path = z + '/' + x + '/' + y;
  let img;
  let pngRow = new hbase.Row(client, 'PascalTestTiles', path);
  pngRow.get('File:Tile', (error, value) => {
	if (error || value === undefined || value === null) {
	console.log("non");
	res.status(200).sendFile(nopath);
    }
    else {
	console.log("oui");
	let truc = unpack(value[0].$);
	let val = value[0]['$'];
	let machin = Buffer.from(truc);
	//console.log(truc);
	fs.writeFile(__dirname + "/pleisthenewdark.png", machin, "image/png", function(err) {
		console.log("err : "+err);
	});
	res.writeHead(200, {
	     'Content-Type': 'image/png',
	     'Content-Length': machin.length
	   });
	   res.end(machin,'binary');
	//res.status(200).send(value);
    }
  });
});

app.use(function(req, res, next){
  res.status(404).send('Page introuvable !');
});

app.listen(8081, function() {
  console.log('Serving on port 8081!');
});
