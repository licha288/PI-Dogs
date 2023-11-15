const express = require("express")
const { Router } = express
const dogRouter = Router()

const getDogsHandler = require("../handlers/getApiDogsHandler")
const getDogsByNameHandler = require("../handlers/getDogsByNameHandler")
const getIdHandler = require("../handlers/getIdHandler")
const postDogHandler = require("../handlers/postDogHandler")

dogRouter.get("/dogs", getDogsHandler)
dogRouter.get("/dogs/name/:name", getDogsByNameHandler)
dogRouter.get("/dogs/id/:id", getIdHandler)
dogRouter.post("/dogs/create", postDogHandler)

module.exports = dogRouter

