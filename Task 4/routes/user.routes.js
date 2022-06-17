const router = require("express").Router()
const userController = require("../controllers/user.controller")

//user Routes
router.get("/", userController.homeUser)
router.get("/singleUser/:id", userController.singleUser)
router.get("/addPostUser", userController.addPostUser)
router.post("/addPostUser", userController.addPostLogicUser)
router.get("/editUser/:id", userController.editUser)
router.post("/editUser/:id", userController.editLogicUser)
router.get("/deleteUser/:id", userController.deleteUser)
router.get("/editStatus/:id", userController.editStatus)
router.post("/editStatus/:id", userController.editLogicStatus)



module.exports = router