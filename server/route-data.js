/**
 * Route for data
 */
"use strict";

const express    = require("express");
const router     = express.Router();
const datafile   = require('./data/log.json');

module.exports = router;

/**
 * Returns all data
 */
router.get("/", (req, res) => {
    res.json(datafile.data);
});


/**
 * Returns wildcard search in IP field
 */
router.get("/ip/:ip", (req, res) => {
    const ipSearch = new RegExp(req.params.ip);
    const items = datafile.data.filter(item => ipSearch.test(item.ip));

    res.json(items);
});

/**
 * Returns case insensitive wildcard search in URL field
 */
router.get("/url/:url(*)", (req, res) => {
    const urlSearch = new RegExp(req.params.url, 'i');
    const items = datafile.data.filter(item => urlSearch.test(item.url));

    res.json(items);
});

/**
 * Returns case-insensitive search in month field.
 * User can search for the first 1-3 letters, for
 * example 'a', 'au' or 'aug'
 */
router.get("/month/:month", (req, res) => {
    const monthSearch = new RegExp('^' + req.params.month, 'i');
    const items = datafile.data.filter(item => monthSearch.test(item.month));

    res.json(items);
});

/**
 * Searches for exact day, but day can be written as 1-31 or 01-31.
 * This way user does not need (but can) enter a zero in front
 * of dates 1-9 even if the log has 01-09, and still
 * get a match.
 */
router.get("/day/:day", (req, res) => {
    const daySearch = new RegExp("^(0?" + req.params.day + ")$");
    const items = datafile.data.filter(item => daySearch.test(item.day));

    res.json(items);
});

/**
 * Returns wildcard search on time that begins with queried string.
 * User cn enter full time or the first 1-5 digits, but must separate hours,
 * minutes and seconds with colon like 1, 12:1 or 12:59:0
 */
router.get("/time/:time", (req, res) => {
    const timeSearch = new RegExp("^" + req.params.time);
    const items = datafile.data.filter(item => timeSearch.test(item.time));

    res.json(items);
});


/**
 * Searches for exact match in day field and wildcard search for time
 * that starts with time-param
 */
router.get("/day/:day/time/:time", (req, res) => {
    const daySearch = new RegExp("^(0?" + req.params.day + ")$");
    const timeSearch = new RegExp("^" + req.params.time);
    const items = datafile.data.filter(item => timeSearch.test(item.time) &&
    daySearch.test(item.day));

    res.json(items);
});


/**
 * Case insensitive wilcard search for month, exact search for date and
 * wilcard search for time that begins with time-param
 */
router.get("/month/:month/day/:day/time/:time", (req, res) => {
    const timeSearch = new RegExp("^" + req.params.time);
    const monthSearch = new RegExp('^' + req.params.month, 'i');
    const daySearch = new RegExp("^(0?" + req.params.day + ")$");
    const items = datafile.data.filter(item => timeSearch.test(item.time) &&
    daySearch.test(item.day) &&
    monthSearch.test(item.month));

    res.json(items);
});
