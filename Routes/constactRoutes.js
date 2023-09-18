const express = require("express");
const {
  getAllContact,
  getAllContacts,
  createContact,
  updateContact,
  deleteConatct,
} = require("../controllers/control");
const router = express.Router();

router.route("/").get(getAllContacts).post(createContact);
router
  .route("/:id")
  .get(getAllContact)
  .put(updateContact)
  .delete(deleteConatct);

module.exports = router;
