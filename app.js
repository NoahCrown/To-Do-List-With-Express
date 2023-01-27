const express = require("express")
const bodyParser = require("body-parser")
// const date = require("/date.js")
const app = express();

let items = ["Rick Sanchez", "Morty Smith", "Rick Prime"]
let workItems = []

app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(express.static("public"))

app.set('view engine', 'ejs')

app.get("/", (req, res) => {

    let today = new Date()
    let options = {
        weekday: "long",
        day: "numeric",
        month: "long",
    }

    let day = today.toLocaleDateString("en-US", options)





    res.render("list", {
        listTitle: day,
        newListItem: items,
    })


})

app.post("/", (req, res) => {
    let item = req.body.newItem

    if (req.body.list === "Work") {
        workItems.push(item)
        res.redirect("/work")
    } else {
        items.push(item)
        res.redirect("/")

    }


})

app.get("/work", (req, res) => {
    res.render("list", {
        listTitle: "Work List",
        newListItem: workItems,
    })
})

app.post("/work", (req, res) => {
    let item = req.body.item
    workItems.push(item)
    res.redirect("/work")
})


app.listen(3000, () => {
    console.log("Server has started in port 3000")
})