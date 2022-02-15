const mongoose = require("mongoose");

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

module.exports = Objects;