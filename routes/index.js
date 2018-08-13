const express = require('express');
const router = express.Router();
const api_url = process.env.API_URL;
const request = require('request-promise-native');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Page List', js:'/bundle.index.js', css:'/index.css' });
});

router.get('/pagelist', (req, res, next) => {
	return res.render('index', { title: 'Page List', js:'/bundle.index.js', css:'/index.css' });
});

router.get('/page/:id', (req, res, next) => {
	let {id} = req.params;
	console.log('GET PAGE:', id);

	res.render('index',{title:'Page:'+id, js:'/bundle.page_view.js', css:'/page_view.css'});
});


router.get('/getInfo/page/:id', (req, res, next) => {
	let {id} = req.params;
	let url = api_url + '/pages/' + id;
	request(url)
		.then((data) => {
			try{data = JSON.parse(data)}catch(e){}
			res.json(data);
		});
});

router.get('/getInfo/pageParts/:id', (req, res, next) => {
	let {id} = req.params;
	let url = api_url + '/pages/' + id + '/parts';
	request(url)
		.then((data) => {
			try{data = JSON.parse(data)}catch(e){}
			res.json(data);
		});
});
router.get('/getInfo/pages', (req, res, next) => {
	let url = api_url + '/pages/';
	request(url)
		.then((data) => {
			try{data = JSON.parse(data)}catch(e){}
			res.json(data);
		});
});

module.exports = router;
