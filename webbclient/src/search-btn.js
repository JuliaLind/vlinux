import { createElement } from "./utils.js";

/**
 * Button to be used in the search-forms
 * @returns {HTMLInputElement}
 */
export const createSearchBtn = () => {
    const btn = createElement(
        "input",
        {
            "type": "submit",
            "value": "Search"
        }
    );

    return btn;
};
