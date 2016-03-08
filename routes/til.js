var express = require('express');
var router = express.Router();

var entries = [
  {slug:"Entry 1", body: "today I learned how to edit text in Atom", created_at: "some date"},
  {slug:"Entry 2", body: "today I learned how to clone a repository", created_at: "some date"}
];

/* READ all: GET entries listing. */
router.get('/', function(req, res, next) {
  res.render('til/index', { title: 'Blog', entries: entries });
});

/* CREATE entry form: GET /entries/new */
router.get('/new', function(req, res, next) {
  res.render('til/new', {title: "Create new entry"});
});

/*CREATE entry: POST /entries/ */
router.post('/', function(req, res, next) {
  til.push(req.body);
  res.render('til/index', { title: 'Blog', entries: entries });
});

/* UPDATE entry form: GET /entries/1/edit */
router.get('/:id/edit', function(req, res, next) {
  res.render('til/update',
  {
    title: 'Update an entry',
    id: req.params.id,
    entry: til[req.params.id]
  });
});

/* UPDATE entry: POST /entries/1 */
router.post('/:id', function(req, res, next) {
  til[req.params.id] = req.body;
  res.render('til/index',
  {
    title: 'Update an entry',
    til: til
  });
});

/* DELETE entry: GET /entries/1/delete  */
router.get('/:id/delete', function(req, res, next) {
  var id = req.params.id
  til = til.slice(0,id).concat(til.slice(id+1, til.length));
  res.render('til/index', { title: 'Blog', entries: entries });
});

/* THIS NEEDS TO BE LAST or /new goes here rather than where it should */
/* READ one entry: GET /entries/0 */
router.get('/:id', function(req, res, next) {
  res.render('til/entry', {title: "a entry", entry: til[req.params.id]});
});

module.exports = router;
