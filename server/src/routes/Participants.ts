import { Request, Response } from "express";
const express2 = require("express");
const router2 = express2.Router();
const { Participants } = require("../models");

router2.post("/", async (req: Request, res: Response) => {
  const participant = req.body;
  await Participants.create(participant);
  res.json(participant);
});

router2.get("/:eventId", async (req: Request, res: Response) => {
  let eventId = req.params.eventId;
  const listOfParticipants = await Participants.findAll({
    where: { EventId: eventId },
  });
  res.json(listOfParticipants);
});

module.exports = router2;
