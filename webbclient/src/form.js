import { createElement, queryServer } from "./utils.js";
import { createSearchBtn } from "./search-btn.js";

/**
 * Template for creating forms for sending different search
 * requests to the server
 * @param {HTMLElement} fields - all fields to be used in the form
 * @returns {HTMLFormElement}
 */
export const createForm = (fields=[]) => {
    const myForm = createElement("form");
    const btn = createSearchBtn();

    for (const field of fields) {
        myForm.appendChild(field);
    }
    myForm.appendChild(btn);

    myForm.addEventListener("submit", (event) => {
        event.preventDefault();

        let query="";

        for (const field of fields) {
            query +=`/${field.name}/${field.value}`;
        }

        queryServer(query);
    });
    return myForm;
};
