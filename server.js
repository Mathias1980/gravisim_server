const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const routes = express.Router();

const PORT = process.env.PORT || 3100;

const objectsSchema = new mongoose.Schema({
    name: String,
    objects: [{
        name: String,
        pos: {x: Number, y: Number},
        vel: {x: Number, y: Number},
        rad: Number,
        dens: Number,
        color: String,
        id: Number, 
        restitution: Number,
        hasTail: Boolean
    }],
});

const Objects = mongoose.model("Objects", objectsSchema);

const a = new Objects();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect("mongodb+srv://mathias1880:6qW_V!.nxLtgjf9@cluster0.crvbh.mongodb.net/gravisim?retryWrites=true&w=majority", { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("database connection established");
})

routes.route('/').get(function(req, res) {
    Objects.find(function(err, objs) {
        if (err) {
            console.log(err);
        } else {
            res.json(objs);
        }
    });
});

routes.route('/add').post(function(req, res) {
    let objs = new Objects(req.body);
    objs.save()
        .then(objs => {
            res.status(200).json({'objs': 'added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding failed');
        });
});

app.use('/objects', routes);
app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});