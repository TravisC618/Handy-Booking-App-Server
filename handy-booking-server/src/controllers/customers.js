const Customer = require("../models/customer");
const Tradie = require("../models/tradie");
const { formatResponse } = require("../utils/helper");

async function addCustomer(req, res) {
  const {
    name,
    gender,
    email,
    language,
    address,
    mobile,
    avatar,
    introduction
  } = req.body;

  const customer = new Customer({
    name,
    gender,
    email,
    language,
    address,
    mobile,
    avatar,
    introduction
  });

  await customer.save();
  return formatResponse(res, 201, null, customer);
}

async function getCustomer(req, res) {
  const { id } = req.params;
  const customer = await Customer.findById(id)
    .populate("tradies", "name")
    .exec();
  if (!customer) {
    return formatResponse(res, 404, "Customer not found", null);
  }
  return formatResponse(res, 200, null, customer);
}

async function getAllCustomers(req, res) {
  const customers = await Customer.find().exec();
  return res.json(customers);
}

async function updateCustomer(req, res) {
  const { id } = req.params;
  const {
    name,
    gender,
    email,
    language,
    address,
    mobile,
    avatar,
    introduction
  } = req.body;

  // join.validate({}, template) ==> to validate update info
  // or just use findById => update => save();
  const newCustomer = await Customer.findByIdAndUpdate(
    id,
    {
      name,
      gender,
      email,
      language,
      address,
      mobile,
      avatar,
      introduction
    },
    { new: true }
  );
  if (!newCustomer) {
    return formatResponse(res, 404, "Customer not full", null);
  }
  return formatResponse(res, 201, null, newCustomer);
}

async function deleteCustomer(req, res) {
  // get id
  const { id } = req.params;
  // get document
  const deletedCustomer = await Customer.findByIdAndDelete(id);
  if (!deletedCustomer) {
    return formatResponse(res, 404, "Customer not full", null);
  }
  // delete ref
  await Tradie.updateMany(
    { _id: { $in: deleteCustomer.tradies } },
    { $pull: { customers: deleteCustomer._id } }
  );

  return formatResponse(res, 200, null, deletedCustomer);
}

async function confirmTradie(req, res) {
  // get id
  const { id, tradieId } = req.params;

  // get document
  const customer = await Customer.findById(id);
  const tradie = await Tradie.findById(tradieId);

  // check existed
  if (!customer) {
    return formatResponse(res, 404, "Customer not full", null);
  }
  if (!tradie) {
    return formatResponse(res, 404, "Tradie not full", null);
  }

  // add tradie to customer
  const tradiesArrOldLength = customer.tradies.length;
  const customersArrOldLength = tradie.customers.length;

  customer.tradies.addToSet(tradie._id);
  tradie.customers.addToSet(customer._id);

  // check array length
  //    - tradie may already confirmed
  if (
    tradiesArrOldLength === customer.tradies.length ||
    customersArrOldLength === tradie.customers.length
  ) {
    return formatResponse(
      res,
      400,
      "Confirm unsuccessfully, please try again.",
      null
    );
  }

  // return success
  await customer.save();
  await tradie.save();
  return formatResponse(res, 201, "Confirm Successfully!", customer);
}

async function deleteTradie(req, res) {
  // get id
  const { id, tradieId } = req.params;

  // get document
  const customer = await Customer.findById(id);
  const tradie = await Tradie.findById(tradieId);

  // check existed
  if (!customer) {
    return formatResponse(res, 404, "Customer not full", null);
  }
  if (!tradie) {
    return formatResponse(res, 404, "Tradie not full", null);
  }

  // delete tradie
  const tradiesArrOldLength = customer.tradies.length;
  const customersArrOldLength = tradie.customers.length;

  customer.tradies.pull(tradie._id);
  tradie.customers.pull(customer._id);

  // check array length
  if (
    tradiesArrOldLength === customer.tradies.length ||
    customersArrOldLength === tradie.customers.length
  ) {
    return formatResponse(
      res,
      400,
      "Delete unsuccessfully, please try again.",
      null
    );
  }

  await tradie.save();
  await customer.save();
  return formatResponse(res, 201, "Delete Successfully!", customer);
}

module.exports = {
  addCustomer,
  getAllCustomers,
  getCustomer,
  updateCustomer,
  deleteCustomer,
  confirmTradie,
  deleteTradie
};
