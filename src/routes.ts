import express from "express";
import { ObjectId } from "mongodb";
import { getClient } from "./db";
import Shoutout from "./model/Shoutout";

const shoutRoutes = express.Router();


// get 
shoutRoutes.get("/shoutouts", (req, res) => {
    getClient().then(client => {
        return client.db().collection<Shoutout>('homeimprovtest').find().toArray().then(results => {
          res.json(results); // send JSON results
        });
      }).catch(err => {
        console.error("FAIL", err);
        res.status(500).json({message: "Internal Server Error"});
      });
})

// get an apple by id
shoutRoutes.get("/shoutouts/:id", (req, res) => {
    const id = req.params.id;
    getClient().then(client => {
      return client.db().collection<Shoutout>('shoutouts').findOne({ _id : new ObjectId(id) }).then(shoutout => {
        if (shoutout) {
          res.json(shoutout);
        } else {
          res.status(404).json({message: "Not Found"});
        }
      });
    }).catch(err => {
      console.error("FAIL", err);
      res.status(500).json({message: "Internal Server Error"});
    });
})

// add a donut
shoutRoutes.post("/shoutouts", (req, res) => {
    const shoutout = req.body as Shoutout;
    getClient().then(client => {
      return client.db().collection<Shoutout>('shoutouts').insertOne(shoutout).then(result => {
        shoutout._id = result.insertedId;
        res.status(201).json(shoutout);
      });
    }).catch(err => {
      console.error("FAIL", err);
      res.status(500).json({message: "Internal Server Error"});
    });
})

// update an apple by id
shoutRoutes.put("/shoutouts/:id", (req, res) => {
    const id = req.params.id;
    const shoutout = req.body as Shoutout;
    delete shoutout._id;
    getClient().then(client => {
      return client.db().collection<Shoutout>('shoutouts').replaceOne({ _id: new ObjectId(id) }, shoutout).then(result => {
        if (result.modifiedCount === 0) {
          res.status(404).json({message: "Not Found"});
        } else {
          shoutout._id = new ObjectId(id);
          res.json(shoutout);
        }
      });
    }).catch(err => {
      console.error("FAIL", err);
      res.status(500).json({message: "Internal Server Error"});
    });
})

// delete an apple by id
shoutRoutes.delete("/shoutouts/:id", (req, res) => {
    const id = req.params.id;
    getClient().then(client => {
      return client.db().collection<Shoutout>('shoutouts').deleteOne({ _id: new ObjectId(id) }).then(result => {
        if (result.deletedCount === 0) {
          res.status(404).json({message: "Not Found"});
        } else {
          res.status(204).end();
        }
      });
    }).catch(err => {
      console.error("FAIL", err);
      res.status(500).json({message: "Internal Server Error"});
    });
})


export default shoutRoutes;