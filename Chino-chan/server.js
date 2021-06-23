const express = require('express')
const app = express()
const port = 3000

app.all('/', (req, res)=>{
  res.send("<h1>Halo ngab</h1>")
})
function keepAlive() {
  app.listen(port, () => {
  console.log(`server ready at http://localhost:${port}`)
})}

module.exports = keepAlive