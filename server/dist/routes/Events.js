"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const { Events } = require("../models");
router.get("/", async (req, res) => {
    const { page = "0", limit = "12" } = req.query;
    const offset = Number(page) * Number(limit);
    const listOfEvents = await Events.findAndCountAll();
    const reversedEvents = listOfEvents.rows.reverse();
    const totalPages = Math.ceil(reversedEvents.length / Number(limit));
    const eventsForCurrentPage = reversedEvents.slice(offset, offset + Number(limit));
    res.json({
        events: eventsForCurrentPage,
        totalPages,
        currentPage: Number(page),
        nextPage: Number(page) < totalPages - 1 ? Number(page) + 1 : null,
    });
});
router.get("/byId/:id", async (req, res) => {
    const id = req.params.id;
    const event = await Events.findByPk(id);
    res.json(event);
});
router.post("/", async (req, res) => {
    const event = req.body;
    await Events.create(event);
    res.json(event);
});
module.exports = router;
