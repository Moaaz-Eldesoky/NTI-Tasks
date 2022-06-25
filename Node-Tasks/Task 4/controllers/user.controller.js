const userModel = require("../db/models/user.model")
class User {
    static homeUser = async (req, res) => {
        try {
            const data = await userModel.find()
            // res.send("test")
            res.render("user/homeUser", {
                pageTitle: "all posts",
                data,
                isEmpty: !data.length
            })
        }
        catch (e) {
            res.send(e)
        }
    }
    static addPostUser = (req, res) => {
        res.render("user/addpostUser", {
            pageTitle: "Add User"
        })
    }
    static addPostLogicUser = async (req, res) => {
        const post = new userModel(req.body)
        // post.save()
        // .then(()=>res.redirect("/") )
        // .catch(e=> console.log(e))
        try {
            await post.save()
            res.redirect("/")
        }
        catch (e) {
            console.log(e)
        }
    }
    static singleUser = async (req, res) => {
        try {
            const userData = await userModel.findById(req.params.id)
            res.render("user/singleUser", { pageTitle: "single User", userData })
        }
        catch (e) {
            res.send(e)
        }
    }
    static editUser = async (req, res) => {
        try {
            const userData = await userModel.findById(req.params.id)
            res.render("user/editUser", { pageTitle: "edit User", userData })
        }
        catch (e) {
            res.send(e)
        }

    }
    static editLogicUser = async (req, res) => {
        try {
            const userData = await userModel.findByIdAndUpdate(req.params.id, req.body, { runValidators: true })
            res.redirect("/");
        }
        catch (e) {
            res.send(e)
        }
    }
    static deleteUser = async (req, res) => {
        try {
            await userModel.findByIdAndDelete(req.params.id)
            res.redirect("/");
        }
        catch {
            res.send(e)
            console.log(`can't delete this id auto Error is : ${e}`)
        }
    }
    static editStatus = async (req, res) => {
        try {
            const statusData = await userModel.findById(req.params.id)
            res.render("user/editStatus", { pageTitle: "edit Status", statusData })
        }
        catch (e) {
            res.send(e)
        }
    }
    static editLogicStatus = async (req, res) => {
        try {
            const userData = await userModel.findByIdAndUpdate(req.params.id, req.body, { runValidators: true })
            res.redirect("/");
        }
        catch (e) {
            res.send(e)
        }
    }

}
module.exports = User
