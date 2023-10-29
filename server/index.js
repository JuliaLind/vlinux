const express = require("express");
const app = express();
const port = 1337;
const morgan = require('morgan');
const cors = require('cors');
const routeData  = require("./route-data.js");

app.use(morgan('combined'));
app.use(cors());
app.use(cors("*"));
app.disable('x-powered-by');
app.use("/data", routeData);

/**
 * Shows all available routes
 */
app.get("/", (req, res) => {
    const routes = {
        routes: [
            "/",
            "/data/ - Shows all rows",
            "/data/ip/:ip - Shows all rows that contain ip <ip>",
            "/data/url/:ul - Shows all rows that contain url <url>",
            "/data/month/:month - Shows all rows that contain month <month>",
            "/data/day/:day - Shows all rows that contain day <day>",
            "/data/time/:time - Shows all rows that contain time <time>",
            "/data/day/:day/time/:time - Shows all rows that contain day <day> and time <time>",
            "/data/month/:month/day/:day/time/:time - Shows all rows " +
            "that contain month <month>, day <day> and time <time>"
        ]
    };

    res.json(routes);
});

app.listen(port, () => {
    console.log(`App listening on port ${port}!`);
});
