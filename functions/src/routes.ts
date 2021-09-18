import express from "express";
import { ObjectId } from "mongodb";
import { getClient } from "./db";
import Project from "./model/Project";

const homeRoutes = express.Router();


// get all projects
homeRoutes.get("/projects", (req, res) => {
    console.log(getClient());
    getClient().then(client => {
        console.log(client);
        return client.db().collection('homeimprovement').find().toArray().then(results => {
          res.json(results); // send JSON results
        });
      }).catch(err => {
        console.error("FAIL", err);
        res.status(500).json({message: "Internal Server Error"});
      });
})

// get a project by id
homeRoutes.get("/projects/:id", (req, res) => {
    const id = req.params.id;
    getClient().then(client => {
      return client.db().collection<Project>('homeimprovement').findOne({ _id : new ObjectId(id) }).then(project => {
        if (project) {
          res.json(project);
        } else {
          res.status(404).json({message: "Not Found"});
        }
      });
    }).catch(err => {
      console.error("FAIL", err);
      res.status(500).json({message: "Internal Server Error"});
    });
})

// add a project
homeRoutes.post("/projects", (req, res) => {
    const project = req.body as Project;
    getClient().then(client => {
      return client.db().collection<Project>('homeimprovement').insertOne(project).then(result => {
        project._id = result.insertedId;
        res.status(201).json(project);
      });
    }).catch(err => {
      console.error("FAIL", err);
      res.status(500).json({message: "Internal Server Error"});
    });
})

// update a project by id
homeRoutes.put("/projects/:id", (req, res) => {
    const id = req.params.id;
    const project = req.body as Project;
    delete project._id;
    getClient().then(client => {
      return client.db().collection<Project>('homeimprovement').replaceOne({ _id: new ObjectId(id) }, project).then(result => {
        if (result.modifiedCount === 0) {
          res.status(404).json({message: "Not Found"});
        } else {
          project._id = new ObjectId(id);
          res.json(project);
        }
      });
    }).catch(err => {
      console.error("FAIL", err);
      res.status(500).json({message: "Internal Server Error"});
    });
})

// delete a project by id
homeRoutes.delete("/projects/:id", (req, res) => {
    const id = req.params.id;
    getClient().then(client => {
      return client.db().collection<Project>('homeimprovement').deleteOne({ _id: new ObjectId(id) }).then(result => {
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


export default homeRoutes;