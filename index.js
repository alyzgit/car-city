const express = require('express')
const app = express()
var cors = require('cors')
app.use(cors())
app.use(express.json()) //express.json() automatically recognizes incoming request object as JSON objects ,then parses any incoming JSON to server into javascript Object so we are able to access these incoming messages such as req.body
app.get("/",function(request,response){
  response.send("Hello World!")
  })
  
app.use(express.urlencoded({ extended: true })); //Express.urlencoded() expects request data to be sent encoded in the URL, usually in strings or arrays:
                                                //In other words, handles application/x-www-form-urlencoded
                    

                                                
const routes = require('./routes.js')

app.use(routes)


const port=4000

 app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })