const express = require("express")
const bodyParser = require("body-parser")
const config = require("config")
const Controller = require("./controller")
const controller = new Controller()

const app = express()

app.use(bodyParser.json({limit: "10mb"}))

app.get("/investments/:id", async (req, res) => {
  const {id} = req.params
  res.send(await controller.getInvestment(id))
})

app.get("/admin/value/investments", async (req, res) => {
  res.send(await controller.getAllInvestmentValue())
})

app.get("/admin/value/investments/:id", async (req, res) => {
  const {id} = req.params
  res.send(await controller.getInvestmentValue(id))
})

app.get("/admin/generate/report", async (req, res) => {
  res.send(await controller.generateReport())
})

app.listen(config.port, (err) => {
  if (err) {
    console.error("Error occurred starting the server", err)
    process.exit(1)
  }
  console.log(`Server running on port ${config.port}`)
})
