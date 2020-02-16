const Task = require("../models/task");
const Customer = require("../models/customer");
const { formatResponse } = require("../utils/helper");

const addTask = async (req, res) => {
  // get id and task info
  const { id } = req.params;
  const { title, location, date, budget, details } = req.body;

  // create a new task
  const newTask = new Task({ title, location, date, budget, details });

  // two-way binding with customer: 1-N
  const existingCustomer = await Customer.findById(id);
  if (!existingCustomer) {
    return formatResponse(res, 404, "User not found", null);
  }
  // add customer to task.customer: 1
  newTask.customer = existingCustomer._id;

  // add task to customer.tasks: N
  const oldCount = existingCustomer.tasks.length;
  existingCustomer.tasks.addToSet(newTask._id);
  if (oldCount === existingCustomer.tasks.length) {
    return formatResponse(res, 400, "Post failed, please try again.", null);
  }

  await existingCustomer.save();
  await newTask.save();
  return formatResponse(
    res,
    200,
    "Congrats! Task has posted successfully.",
    newTask
  );
};

module.exports = { addTask };
