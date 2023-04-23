// Write a phonebook app using node and express. The data you need to use is 
// [
//     { 
//       "id": 1,
//       "name": “Kiran Rana”, 
//       "number": "040-123456"
//     },
//     { 
//       "id": 2,
//       "name": “Pratik Bhusal”, 
//       "number": "39-44-5323523"
//     },
//     { 
//       "id": 3,
//       "name": “Jon Doe”, 
//       "number": "12-43-234345"
//     },
//     { 
//       "id": 4,
//       "name": "Mary Poppendieck", 
//       "number": "39-23-6423122"
//     }
// ]
// Your api should support all five RESTful routes for the /persons endpoint.



const express = require('express');
const app = express();

// Initialize data
let persons = [
  {
    id: 1,
    name: 'Kiran Rana',
    number: '040-123456'
  },
  {
    id: 2,
    name: 'Pratik Bhusal',
    number: '39-44-5323523'
  },
  {
    id: 3,
    name: 'Jon Doe',
    number: '12-43-234345'
  },
  {
    id: 4,
    name: 'Mary Poppendieck',
    number: '39-23-6423122'
  }
];

// Middleware to parse JSON body
app.use(express.json());

// RESTful routes for /persons endpoint

// GET all persons
app.get('/persons', (req, res) => {
  res.json(persons);
});

// GET a single person by ID
app.get('/persons/:id', (req, res) => {
  const person = persons.find(p => p.id === parseInt(req.params.id));
  if (!person) {
    return res.status(404).send('Person not found');
  }
  res.json(person);
});

// POST a new person
app.post('/persons', (req, res) => {
  const person = req.body;
  person.id = persons.length + 1;
  persons.push(person);
  res.json(person);
});

// PUT (update) an existing person by ID
app.put('/persons/:id', (req, res) => {
  const person = persons.find(p => p.id === parseInt(req.params.id));
  if (!person) {
    return res.status(404).send('Person not found');
  }
  person.name = req.body.name;
  person.number = req.body.number;
  res.json(person);
});

// DELETE a person by ID
app.delete('/persons/:id', (req, res) => {
  const personIndex = persons.findIndex(p => p.id === parseInt(req.params.id));
  if (personIndex === -1) {
    return res.status(404).send('Person not found');
  }
  persons.splice(personIndex, 1);
  res.sendStatus(204);
});

// Start server
const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});