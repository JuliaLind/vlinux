import { createElement, displayResult } from "./utils.js";

/**
 * The table to display the search result in
 * @param {HTMLDivElement} container - the main container
 * @returns {HTMLTableElement}
 */
export const addResultTable = (container) => {
    const resultTable = createElement("table");
    const tableHead = resultTable.createTHead();
    const header = createElement("tr");
    const resultCount = createElement("p.result-count");

    container.appendChild(resultCount);
    for (const value of ["Ip", "Day", "Month", "Time", "Url"]) {
        const title = createElement(
            "th",
            {},
            {
                "innerText": value
            }
        );

        header.appendChild(title);
    }
    tableHead.appendChild(header);
    const tableBody = resultTable.createTBody();

    document.addEventListener("refresh", (event) => {
        displayResult(event.detail, tableBody);
        resultCount.innerText = `Your search resulted in ${event.detail.length} hits`;
    });
    displayResult([], tableBody);
    container.appendChild(resultTable);

    return resultTable;
};
