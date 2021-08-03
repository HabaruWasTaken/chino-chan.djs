const express = require('express')
const app = express()
const port = 3000

app.all('/', (req, res)=>{
  res.send(`<!doctype html>
<html dir="ltr" lang="en">
  <head>
    <meta charset="utf-8">
    <title>FBK IS MINE!</title>
    <style>
    body {
      margin: 0;
    }

  .container {
    position: relative;
    text-align: center;
    color: white;
    width: 100%;
    height: 100%
  }

    .fbkimg {
      object-fit: fill;
      width: 100%;
      height: 100%
    }

  .txt {
      position: absolute;
      top: 80%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: black;
      font size: 10%;
  }
    </style>
  </head>
  <body>
      <div class="container">
        <img src="https://i.pinimg.com/originals/96/87/38/9687387cb690e2fd2451ab8541b75730.jpg" width="384" height="216" alt="FBK IS MINE!" class="fbkimg">
        <h4 class="txt">FBK IS MINE!</h4>
      <div>
  </body>
</html>
`)
})
function keepAlive() {
  app.listen(port, () => {
  console.log(`server ready at http://localhost:${port}`)
})}

module.exports = keepAlive