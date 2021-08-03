const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/hello', (req, res) => {
    res.send('In hello function')
})

app.get('/time', (req, res) => {
    var t = new Date().getTime()
    res.send("Time is " + t)
})

app.get('/files/:name', (req, res) => {

    //res.send("U sent " + req.params.name)
    try {

        var filename = req.params.name
        res.sendFile(__dirname + "\\" + filename)
    } catch (ex) {
        res.status(404)
        res.send("ERROR NOT FOUND ")
    }
})


app.listen(port, () => {
    console.log("Example app listening at http://localhost:${port}")
})