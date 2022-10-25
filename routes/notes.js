const express = require("express");
const router = express.Router();
const validator = require("fastest-validator");
const v = new validator();
const parser = require("body-parser");
let { notes } = require("../models");

router.use(parser.json());

// create data with post method
router.post("/", async (req, res, next) => {
  const schema = {
    title: "string",
    description: "string",
  };
  const validate = v.validate(req.body, schema);
  if (validate.length) return res.status(400).json({ message: validate });

  console.log(req.body);
  let note = await notes.create(req.body);
  res.json({
    message: "success",
    data: note,
  });
});

// change data with put method
router.put("/:id", async (req, res, next) => {
  let id = req.params.id;
  let byid = await notes.findByPk(id);
  if (!byid) return res.status(404).json({ message: "not found" });

  const schema = {
    title: "string",
    description: "string|optional",
  };
  const validate = v.validate(req.body, schema);
  if (validate.length) return res.status(400).json({ message: validate });

  let updateData = await byid.update(req.body);
  res.json({ ok: updateData });
});

// get all data with get method
router.get("/getAll", async (req, res, next) => {
  let allNotes = await notes.findAll();
  if (allNotes.length === 0) {
    return res.status(404).json({ message: "not found" });
  }
  res.json({ ok: allNotes });
});

// delete data with delete method
router.delete("/:id", async (req, res, next) => {
  let id = req.params.id;
  let byid = await notes.findByPk(id);
  if (!byid) return res.status(404).json({ message: "not found" });

  let deleteData = await byid.destroy();
  res.json({ ok: deleteData });
});

// get data by id with get method
router.get("/:id", async (req, res, next) => {
  let id = req.params.id;
  let byid = await notes.findByPk(id);
  if (!byid) return res.status(404).json({ message: "not found" });
  res.json({ ok: byid });
});

module.exports = router;
