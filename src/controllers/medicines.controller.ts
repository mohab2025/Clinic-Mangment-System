import { RequestHandler } from "express";
import mongoose from "mongoose";
import Medicines from "../models/medicines.model";

export default class MedicineController {
  getMedicines: RequestHandler = (req, res, next) => {
    Medicines.find({})
      .then((medicines) => {
        if (!medicines) next(new Error("Medicines is empty!"));

        res.status(200).json({ medicines });
      })
      .catch((error) => next(error));
  };

  getMedicine: RequestHandler = (req, res, next) => {
    Medicines.findOne({ _id: req.params.id })
      .then((medicine: any) => {
        if (!medicine) next(new Error("Sorry, the medicine not found!"));

        res.status(200).json({ medicine });
      })
      .catch();
  };

  addMedicines: RequestHandler = (req, res, next) => {
    let medicinesArr = req.body.medicines;

    try {
      medicinesArr.forEach((medicine: any, idx: Number) => {
        Medicines.findOne({ tradeName: medicine.tradeName })
          .then((data: any) => {
            if (data) throw new Error(`${medicine.tradeName}: exist already`);

            const newMedicine = new Medicines({
              _id: new mongoose.Types.ObjectId(),
              tradeName: medicine.tradeName,
              scientificName: medicine.scientificName,
              type: medicine.type,
            
            });

            return newMedicine
              .save()
              .then((data: any) =>
                res.status(200).json({ msg: "Medicine Added!", data, idx })
              )
              .catch((error: any) => next(error));
          })
          .catch((error: any) => next(error));
      });
    } catch (error: any) {
      next(error);
    }
  };

  addMedicine: RequestHandler = (req, res, next) => {
    try {
      Medicines.findOne({ tradeName: req.body.tradeName })
        .then((medicine) => {
          if (medicine) next(new Error("This medicine exist already"));

          let newMedicine = new Medicines({
            _id: new mongoose.Types.ObjectId(),
            tradeName: req.body.tradeName,
            scientificName: req.body.scientificName,
            type: req.body.type,
           
          });

          newMedicine
            .save()
            .then((data) =>
              res.status(200).json({ msg: "Medicine Added!", data })
            )
            .catch((error) => next(error));
        })
        .catch((error) => next(error));
    } catch (error) {
      next(error);
    }
  };

  updateMedicine: RequestHandler = (req, res, next) => {
    res.status(201).json({ data: "Updated Ya Man🥰" });
  };

  updateMedicines: RequestHandler = (req, res, next) => {
    let medicinesArr = req.body.medicines;
    try {
      medicinesArr.forEach((medicine: any, idx: Number) => {
        Medicines.findOne({
          tradeName: medicine.tradeName,
          scientificName: medicine.scientificName,
        })
          .then(async (data: any) => {
            if (!data) throw new Error(`${medicine.tradeName} not exist!`);

            for (let item in medicine) {
              data[item] = medicine[item];
            }
            let savedMedicine = await data.save();

            if (savedMedicine)
              res
                .status(200)
                .json({ msg: "Medicines Updated!", savedMedicine });
          })
          .catch((error) => next(error));
      });
    } catch (error) {
      next(error);
    }
  };

  deleteMedicine: RequestHandler = (req, res, next) => {
    Medicines.deleteOne({ _id: req.params.id })
      .then((data: any) => {
        res.status(201).json({ msg: "Medicine Deleted!", data });
      })
      .catch((error: any) => next(error));
  };
}
