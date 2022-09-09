import { check, body, param, query } from "express-validator";

export const bodyValidator=[
    body("id").isMongoId().withMessage("id should be Mongoose"),
]  

export const postValidator=[
    body("name").isAlpha().withMessage("service Name should be string"),
    body('cost').isNumeric().withMessage("cost should be Number")
]


export const ParamValidator=[
    param("id").isMongoId().withMessage('param should be mongoId'),
   
]

export const putValidator=[
    body("name").optional().isAlpha().withMessage("service Name should be string"),
    body('cost').optional().isNumeric().withMessage("cost should be Number")
]