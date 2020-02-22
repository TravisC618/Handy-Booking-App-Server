const Task = require("../models/task");
const Customer = require("../models/customer");
const {
  formatResponse,
  countAllwithSearch,
  getAll
} = require("../utils/helper");
const { convertQuery } = require("../utils/helper");

async function addTask(req, res) {
  // get id and task info
  const { customerId } = req.params;
  const { title, location, dueDate, budget, details } = req.body;

  // create a new task
  const newTask = new Task({ title, location, dueDate, budget, details });

  // two-way binding with customer: 1-N
  const existingCustomer = await Customer.findById(customerId);
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
}

async function getTask(req, res) {
  const { id } = req.params;
  const task = await Task.findById(id).exec();
  if (!task) {
    return formatResponse(res, 404, "Task not found", null);
  }
  return formatResponse(res, 200, null, task);
}

// async function getAllTasks(req, res) {
//   const { minPrice = 5, maxPrice = 9999 } = req.query;
//   const tasks = await Task.find({ budget: { $gte: minPrice, $lte: maxPrice } });
//   return formatResponse(res, 200, null, tasks);
// }

async function getAllTasks(req, res) {
  // q: search key
  const { q } = req.query;
  const total = await countAllwithSearch(Task, q);

  // deal with pagination, sort, search
  const { pagination, priceRange, search, sort } = convertQuery(
    req.query,
    total
  );

  const tasks = await getAll(Task, pagination, priceRange, search, sort);

  return formatResponse(res, 200, null, { tasks, pagination });
}

module.exports = { addTask, getAllTasks, getTask };
