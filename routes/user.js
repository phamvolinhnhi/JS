const userController = require("../controllers/userController");

const router=require("express").Router();
//Add user

router.post("/",userController.addUser);
//GET ALL BOOKS
router.get("/", userController.getAllUsers);

//GET A BOOK
router.get("/:id", userController.getAUser);

//UPDATE A BOOK
router.put("/:id", userController.updateUser);

//DELETE A BOOK
router.delete("/:id", userController.deleteUser);

//Signup
router.post("/signup", userController.signup);

router.post("/signin", userController.signin);

module.exports=router;