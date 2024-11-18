const express = require("express");
const router = express.Router();
const cartController = require("../Controllers/cartController");

router.post("/", cartController.addToCart);
router.get("/:user_id", cartController.getCart);
router.delete("/:id", cartController.removeFromCart);
router.post("/confirm", cartController.confirmOrder);

module.exports = router;
