import { createElement } from "./utils.js";

/**
 * Template used for creating textfields
 * for wildcard-search in url and ip
 * @param {string} name - name of the text-field
 * @returns {HTMLInputElement}
 */
export const createTextfield = (name) => {
    const textfield = createElement(
        "input",
        {
            "type": "text",
            "name": `${name}`,
            "required": "required",
            "placeholder": `enter full or partial ${name} here`
        }
    );

    return textfield;
};
