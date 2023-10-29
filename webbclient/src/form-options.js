import { createForm } from "./form.js";
import { createTextfield } from "./textfield.js";
import { createMonthSelect } from "./month-select.js";
import { createDayfield } from "./dayfield.js";
import { createTimefield } from "./timefield.js";


/**
 * Associative array containing
 * all available search-forms,
 * their description to include in the
 * field for selecting form and a help
 * text do display when user clicks on the info-button.
 * @returns {Object}
 */
export const createFormOptions = () => {
    const allForm = createForm();
    const ipForm = createForm([
        createTextfield("ip")
    ]);
    const urlForm = createForm([
        createTextfield("url")
    ]);
    const monthForm = createForm([
        createMonthSelect()
    ]);
    const dayForm = createForm([
        createDayfield()
    ]);
    const timeForm = createForm([
        createTimefield()
    ]);
    const dayTimeForm = createForm([
        createDayfield(),
        createTimefield()
    ]);
    const monthDayTimeForm = createForm([
        createMonthSelect(),
        createDayfield(),
        createTimefield(),
    ]);

    const lastPart = `<p>You can close this note by clicking on 
    it or on the info-symbol. Re-open the note at any time by 
    clicking on the info-symbol again.</p>`;
    const forms = {
        "all": {
            descr: "all data",
            form: allForm,
            info: `<p>Click on the search-button to get all data.</p>${lastPart}`
        },
        "ip": {
            descr: "ip",
            form: ipForm,
            info: `<p>Enter full or partial IP address and click on the search-button.
            Remember to include the dots.</p>${lastPart}`
        },
        "url": {
            descr: "url",
            form: urlForm,
            info: `<p>Enter full or partial URL address and click on 
            the search-button.</p>${lastPart}`
        },
        "month": {
            descr: "month",
            form: monthForm,
            info: `<p>Select a month from the scroll down menu and click 
            on the search button.</p>${lastPart}`
        },
        "day": {
            descr: "day",
            form: dayForm,
            info: `<p>Enter a day between 1-31 in the number-field and 
            click on the search-button.</p>
            ${lastPart}`
        },
        "time": {
            descr: "time",
            form: timeForm,
            info: `<p>Enter a time in the text-field and click 
            on the search-button.</p>
            <p>You can enter the full time of 6 digits 
            or just the first 1-5 digits</p><p>Proper form for 
            time is 00:00:00 but if you miss the colon, it will 
            be added automatically ;)</p>${lastPart}`
        },
        "day-time": {
            descr: "day + time",
            form: dayTimeForm,
            info: `<p>Enter a day and a time and 
            click on the search-button.</p>
            <p>In the time-field you can enter the full 
            time of 6 digits or just the first 1-5 digits</p>
            <p>Proper form for time is 00:00:00 but if you miss the colon, 
            it will be added automatically ;)</p>${lastPart}`
        },
        "month-day-time": {
            descr: "month + day + time",
            form: monthDayTimeForm,
            info: `<p>Select a month from the scrolldown menu, enter a day 
            and a time and click on the search-button.</p>
            <p>In the time-field you can enter the full time of 6 digits 
            or just the first 1-5 digits</p>
            <p>Proper form for time is 00:00:00 but if you miss the colon, 
            it will be added automatically ;)</p>${lastPart}`
        }
    };

    return forms;
};
