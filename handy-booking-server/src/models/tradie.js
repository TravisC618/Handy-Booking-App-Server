const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

const schema = new mongoose.Schema({
  // user id --> login account
  // add more field: password ...
  name: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: email =>
        !Joi.string()
          .email()
          .validate(email).error,
      msg: "Invalid email format"
    }
  },
  language: {
    type: Array,
    default: ["English"]
  },
  address: {
    type: String
  },
  avatar: {
    type: String
  },
  introduction: {
    type: String,
    default: "I'm too lazy to give an introduction :)"
  },
  title: {
    type: String
  },
  professionalYears: {
    type: Number
  },
  skills: {
    type: Array
  },
  vocation: {
    type: String
  },
  reviews: [{ body: String, date: Date }],
  customers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer"
    }
  ],
  tasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task"
    }
  ]
});

const model = mongoose.model("Tradie", schema);
module.exports = model;
