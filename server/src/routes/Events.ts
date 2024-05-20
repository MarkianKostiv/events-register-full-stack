import express, { Request, Response } from "express";
const router = express.Router();
const { Events } = require("../models");

router.get(
  "/",
  async (
    req: Request<{}, {}, {}, { page?: string; limit?: string }>,
    res: Response
  ) => {
    const { page = "0", limit = "12" } = req.query;

    const offset = Number(page) * Number(limit);

    const listOfEvents = await Events.findAndCountAll();

    const reversedEvents = listOfEvents.rows.reverse();

    const totalPages = Math.ceil(reversedEvents.length / Number(limit));

    const eventsForCurrentPage = reversedEvents.slice(
      offset,
      offset + Number(limit)
    );

    res.json({
      events: eventsForCurrentPage,
      totalPages,
      currentPage: Number(page),
      nextPage: Number(page) < totalPages - 1 ? Number(page) + 1 : null,
    });
  }
);

router.get("/byId/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const event = await Events.findByPk(id);
  res.json(event);
});

router.post("/", async (req: Request, res: Response) => {
  const event = req.body;
  await Events.create(event);
  res.json(event);
});

module.exports = router;
