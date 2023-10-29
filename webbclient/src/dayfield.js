import { createElement } from "./utils.js";

/**
 * Form-field to search for date. 1-31 is valid input
 * @returns {HTMLInputElement}
 */
export const createDayfield = () => {
    const dayfield = createElement(
        "input",
        {
            "type": "number",
            "name": "day",
            "required": "required",
            "value": "17",
            "min": "1",
            "max": "31",
            "step": "1"
        }
    );

    return dayfield;
};
