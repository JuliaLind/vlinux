
/** global: CustomEvent */
import loader from "./loader.js";

/**
 * Sends data request to server with query params
 * @example of query: /month/Aug/day/17/time/14
 * @param {string} query
 */
async function queryServer(query) {
    loader.show();
    const response = await fetch(`http://localhost:1337/data${query}`);
    let result = [];

    if (response.status < 400) {
        result = await response.json();
    }

    const newData = new CustomEvent("refresh", { detail: result });

    document.dispatchEvent(newData);
}

/**
 * Helper function for creating new elements
 * @param {string} hyperscript
 * @param {Object} attributes
 * @param {Object} options
 * @returns {HTMLElement}
 */
function createElement(hyperscript, attributes={}, options={}) {
    const hyperscriptArray = hyperscript.split(".");
    const classes = hyperscriptArray.slice(1);
    let element = document.createElement(hyperscriptArray[0]);

    classes.forEach((item) => {
        element.classList.add(item);
    });

    for (const option in options) {
        element[option] = options[option];
    }

    for (const attribute in attributes) {
        element.setAttribute(attribute, attributes[attribute]);
    }

    return element;
}

/**
 * FOr "Filling out" small resultset with extra rows in table body
 * @param {HTMLElement} tableBody 
 * @param {number} extraRows number of empty rows to add to table body
 * @param {number} columns number of columns in a row
 */
function addMoreRows(tableBody, extraRows, columns) {
    while (extraRows > 0) {
        const tRow = createElement("tr");

        for (let i=1; i<=columns; i++) {
            const tCell = createElement("td");

            tRow.appendChild(tCell);
        }
        extraRows--;
        tableBody.appendChild(tRow);
    }
}

/**
 * Replaces table content with the result from
 * latest server-query. Adds additional empty rows if the
 * result contains less than 10 items for a nicer look
 * @param {array} resultArr
 * @param {HTMLElement} tableBody
 */
function displayResult(resultArr, tableBody) {
    tableBody.innerHTML = "";

    resultArr.forEach((elem) => {
        const tRow = createElement("tr");

        Object.keys(elem).forEach((key) => {
            const tCell = createElement(
                "td",
                {},
                {
                    textContent: elem[key]
                }
            );

            tRow.appendChild(tCell);
        });
        tableBody.appendChild(tRow);
    });

    if (resultArr.length < 10) {
        let extraRows = 10 - resultArr.length;

        addMoreRows(tableBody, extraRows, 5);
    }
    loader.hide();
}

export { createElement, queryServer, displayResult };
