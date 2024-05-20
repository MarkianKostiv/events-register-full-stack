"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router2 = express_1.default.Router();
const { Participants } = require("../models");
router2.post("/", async (req, res) => {
    const participant = req.body;
    await Participants.create(participant);
    res.json(participant);
});
router2.get("/:eventId", async (req, res) => {
    let eventId = req.params.eventId;
    const listOfParticipants = await Participants.findAll({
        where: { EventId: eventId },
    });
    res.json(listOfParticipants);
});
module.exports = router2;
