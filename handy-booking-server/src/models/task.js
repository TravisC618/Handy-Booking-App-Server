const mongoose = require("mongoose");

const schema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 50
  },
  status: {
    type: String,
    default: "open" // open/assigned/completed/expired
  },
  location: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  budget: {
    type: Number,
    required: true
  },
  details: {
    type: String,
    required: true,
    minlength: 25,
    maxlength: 1000
  },
  offer: {
    type: Array
  },
  comment: {
    type: Array
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true
  },
  tradie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tradie"
  }
});

const model = mongoose.model("Task", schema);

module.exports = model;
