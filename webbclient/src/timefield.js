import { createElement } from "./utils.js";

/**
 * Input field for entering time
 * @returns {HTMLInputElement}
 */
export const createTimefield = () => {
    // valid time = 0 - 23:59:59, 0 will for
    // example give all results between 00:00:00 and 09:59:59,
    // 00:1 will give all results between 00:10:00 and 00:19:59 etc
    const timefield = createElement(
        "input",
        {
            "type": "text",
            "name": "time",
            "required": "required",
            "placeholder": "00:00:00",
            "inputmode": "numeric",
            "maxlength": "8"
        }
    );

    // Adds a colon between hours, minutes and seconds
    // so user does not need to
    timefield.addEventListener("keyup", () => {
        if (timefield.value.length > 2 && !timefield.value.includes(":")) {
            timefield.value = timefield.value.substr(0, 2) + ":" + timefield.value.substr(2);
        }
        if (timefield.value.length > 5 && timefield.value[5] != ":") {
            timefield.value = timefield.value.substr(0, 5) + ":" + timefield.value.substr(5);
        }
    });

    return timefield;
};
