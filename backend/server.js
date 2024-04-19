import express from "express"
import cors from "cors"

//app config
const app = express(); //initialie app with express package
const port = 4000;                   //define port number where our server will be running


//initializing middleware
app.use(express.json()); //using middleware whenever we will get request from frontend to backend , that will be parsed using json
app.use(cors()) // using this we can access  backend from any  forntend


app.get("/", (req, res) => {
    res.send("API Working")
})    // get method is http method, using this we can request data from server


app.listen(port, () => {
    console.log(`Server Started on http://localhost:${port}`)
}) //running server