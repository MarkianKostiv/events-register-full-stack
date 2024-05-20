"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const axios_1 = __importDefault(require("axios"));
const PORT = process.env.PORT || 3002;
const timeToAddEventToDb = 14400000;
const db = require("./models");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
const getSomeData = async () => {
    try {
        const response = await axios_1.default.get("https://jsonplaceholder.typicode.com/users");
        const data = response.data;
        const randomIndex = Math.floor(Math.random() * data.length);
        return data[randomIndex];
    }
    catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
};
const getRandomDate = () => {
    const start = new Date();
    const end = new Date();
    end.setFullYear(end.getFullYear() + 1);
    const randomTime = start.getTime() + Math.random() * (end.getTime() - start.getTime());
    const randomDate = new Date(randomTime);
    const day = String(randomDate.getDate()).padStart(2, "0");
    const month = String(randomDate.getMonth() + 1).padStart(2, "0");
    const year = randomDate.getFullYear();
    return `${day}.${month}.${year}`;
};
const saveEventData = async (eventData) => {
    try {
        const objToSave = {
            title: `${eventData.company.name}`,
            description: `${eventData.company.catchPhrase}`,
            eventDate: getRandomDate(),
            organizer: `${eventData.name}`,
        };
        console.log(objToSave);
        await axios_1.default.post("http://localhost:3002/events", objToSave);
        console.log("Event data saved successfully:", eventData);
    }
    catch (error) {
        console.error("Error saving event data:", error);
    }
};
const eventsRouter = require("./routes/Events");
app.use("/events", eventsRouter);
const participantsRouter = require("./routes/Participants");
app.use("/participants", participantsRouter);
const startServer = async () => {
    db.sequelize
        .authenticate()
        .then(() => {
        console.log("Підключення до бази даних успішне.");
    })
        .catch((error) => {
        console.error("Помилка підключення до бази даних:", error);
    });
    db.sequelize.sync().then(() => {
        app.listen(PORT, () => {
            console.log(`Сервер працює на порту ${PORT}`);
            setInterval(async () => {
                const eventData = await getSomeData();
                if (eventData) {
                    await saveEventData(eventData);
                }
            }, timeToAddEventToDb); // add new item to db 4 hours.
        });
    });
};
startServer();
