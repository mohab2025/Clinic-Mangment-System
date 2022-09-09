import { Request, Response, NextFunction } from "express";

import mongoose from "mongoose";

import services from '../models/services.model'

export default class ServiceController {
    getAllService(request: Request, response: Response, next: NextFunction){
            services.find({})
            .then(data=>{
                response.status(200).json(data)
            })
            .catch(error=>{next(error)})
    }

    getServiceById(request: Request, response: Response, next: NextFunction){
            services.findOne({_id:request.params.id})
            .then(data=>{
                response.status(200).json(data)
            })
            .catch(error=>{next(error)})
    }

   createService(request: Request, response: Response, next: NextFunction) {
        let serviceobject=new services({
            _id:new mongoose.Types.ObjectId(),
            name: request.body.name,
            cost:request.body.cost
        })
        serviceobject.save()
        .then((data) => {
            response.status(201).json({ data: "added" });
          })
          .catch((error) => next(error));      
   }

   updateService(request: Request, response: Response, next: NextFunction) {
    services.findById(request.params.id)
      .then((data: any) => {
        if (!data) next(new Error("services not found"));
        else {
          for (let key in request.body) {
            data[key] = request.body[key];
          }
          return data.save();
        }
      })
      .then((data) => {
        response.status(201).json({ data: "updated" });
      })
      .catch((error) => next(error));
  }

  deleteService(request: Request, response: Response, next: NextFunction) {
    services.deleteOne({ _id: request.params.id })
      .then((data) => {
        if (!data) next(new Error("service not found"));
        response.status(200).json({ data: "delete " + request.params.id });
      })
      .catch((error) => next(error));
  }

}