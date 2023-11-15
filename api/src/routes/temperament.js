const express = require("express")
const { Router } = express
const {saveTemperamentsHandler, getTemperamentsHandler} = require("../handlers/getTemperamentHandler")
const temperamentRouter = Router()

temperamentRouter.get("/save", saveTemperamentsHandler)
temperamentRouter.get("/get", getTemperamentsHandler)

module.exports = temperamentRouter
