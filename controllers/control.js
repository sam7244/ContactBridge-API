const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactsModel");
//@desc get all the contacts
//@route GET api/contact
//@access private

const getAllContacts = asyncHandler(async (req, res) => {
  const contact = await Contact.find({ user_id: req.user.id });
  res.status(200).json(contact);
});

//@desc create constact
//@route POST api/contact
//@access private

const createContact = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status = 400;
    throw new Error("the error is error");
  }

  const contact = await Contact.create({
    name,
    email,
    phone,
    user_id: req.user.id,
  });

  res.status(201).json(contact);
});

//@desc get onr contact
//@route GET api/contact/:id
//@access private

const getAllContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    res.status(400);
    throw new Error("provide the correct Id");
  }

  res.status(200).json(contact);
});
//@desc update contact
//@route PUT api/contact/:id
//@access private

const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    res.status(400);
    throw new Error("provide the correct Id");
  }

  if (contact.user_id.toString() !== req.user.id) {
    res.status(400);
    throw new Error("don't have the privillage to update");
  }

  const contract1 = await Contact.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(201).json(contract1);
});
//@desc delete conatct
//@route DELETE api/contact/:id
//@access private

const deleteConatct = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    res.status(400);
    throw new Error("provide the correct Id");
  }

  if (contact.user_id.toString() !== req.user.id) {
    res.status(400);
    throw new Error("don't have the privillage to update");
  }

  await Contact.deleteOne({ _id: req.params.id });

  res.status(200).json(contact);
});

module.exports = {
  getAllContact,
  getAllContacts,
  updateContact,
  deleteConatct,
  createContact,
};
