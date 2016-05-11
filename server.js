//kallar alla packet vi behöver.
var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(express.static('public'));

// spara en tom array som heter databas.
var databas = [
	{ title: 'Title', text: 'Body' }
];

//hämtar data 
app.get('/db', function (req, res) {
	res.json(databas);
});
//hämtar id
app.get('/:id', function (req, res) {
	var objekt = databas[req.params.id];
	res.json(objekt);
});	
//ta bort data
app.delete('/:id', function (req, res) {
	databas.splice(req.params.id, 1);
	res.json({ message: "objekt är raderat", status: 'OK'})

})
//updatera data
app.put('/:id', function (req, res) {
	console.log(req.params.id);
	var id = parseInt(req.params.id);


	if (typeof databas[id] !== 'undefined') {
		databas[id].title = req.body.title;
		databas[id].text = req.body.text;

		status = 'OK';
	}

	res.json({ status: status });
});
//posta data
app.post("/insert", function (req, res) {
	databas.push( {
		id: parseInt(databas.length),
		title: req.body.title,
		text: req.body.text
	})
	//res.json({message: "KLART"})
	res.redirect('/');
})


var server = app.listen(3000, function () {
	console.log('Server started. Listening to connections on port 3000\n');
});

