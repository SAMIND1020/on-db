const express = require("express");
const cors = require("cors");

const db = require("../database");

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;

        // routes
        this.paths = {
            auth: "/server/auth",
            eventsbygroup: "/server/groups",
            generalevents: "/server/events",
            groups: "/server/groups",
            people: "/server/people",
            services: "/server/services",
            users: "/server/users",
        };

        // middlewares
        this.middlewares();

        // Routes
        this.routes();

        // Database
        this.dbConnect();
    }

    init() {
        this.listen(this.port);
    }

    middlewares() {
        // Public directory
        this.app.use(express.static("public"));

        // CORS
        this.app.use(cors());

        // Read and parse json
        this.app.use(express.json());
    }

    routes() {
        this.app.use(this.paths.auth, require("../routes/auth"));
        this.app.use(this.paths.eventsbygroup, require("../routes/eventsbygroup"));
        this.app.use(this.paths.generalevents, require("../routes/generalevents"));
        this.app.use(this.paths.groups, require("../routes/groups"));
        this.app.use(this.paths.people, require("../routes/people"));
        this.app.use(this.paths.services, require("../routes/services"));
        this.app.use(this.paths.users, require("../routes/users"));

        this.app.get('*', (req, res) => res.json('Not Fount 404'))
    }

    listen(port) {
        this.app.listen(port, () => {
            console.log("Server running in port", port);
        });
    }

    async dbConnect() {
        try {
            await db.authenticate();
            console.log('Database has been connected');
        } catch (error) {
            throw new Error(error);
        }
    }
}

module.exports = Server;