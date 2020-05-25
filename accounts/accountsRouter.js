const express = require("express");

//database access using knex
const db = require("../data/dbConfig.js");

const router = express.Router();

router.get("/", (req, res) => {
  db("accounts")
    .then((accounts) => {
      res.json(accounts);
    })
    .catch((err) => {
      res.status(500).json({ message: "error retrieving accounts" });
    });
});

router.get("/:id", (req, res) => {
    db("accounts")
      .where({ id: req.params.id })
      .first()
      .then((account) => {
        if (account) {
          res.status(200).json({ data: account });
        } else {
          res.status(400).json({ message: "Account not found" });
        }
      })
      .catch((error) => {
        res.status(500).json({ message: "Sorry, ran into an error" });
      });
  });

  router.post("/", (req, res) => {
    const accountData = req.body;
  
    db("accounts")
      .insert(accountData)
      .then((account) => {
        res.status(201).json(account);
      })
      .catch((err) => {
        res.status(500).json({ message: "Failed to add Account", err });
      });
  });
  
  router.put("/:id", (req, res) => {
    const { id } = req.params;
    const changes = req.body;
  
    db("accounts")
      .where({ id })
      .update(changes)
      .then((count) => {
        if (count) {
          res.json({ updated: count });
        } else {
          res.status(404).json({ message: "invalid id" });
        }
      })
      .catch((err) => {
        res.status(500).json({ message: "error updating", err });
      });
  });
  
  router.delete("/:id", (req, res) => {
    db("accounts")
      .where({ id: req.params.id })
      .del()
      .then((count) => {
        if (count > 0) {
          res.status(200).json({ message: "Account deleted successfully" });
        } else {
          res.status(404).json({ message: "Account not found" });
        }
      })
      .catch((error) => {
        res.status(500).json({ message: "sorry, ran into an error", error });
      });
  });

module.exports = router;