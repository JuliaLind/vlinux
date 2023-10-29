import { createElement } from "./utils.js";

/**
 * Select-field for selecting a month,
 * ranges Jan-Dec
 * @returns {HTMLSelectElement}
 */
export const createMonthSelect = () => {
    const monthSelect = createElement(
        "select.placeholder",
        {
            "name": "month",
            "required": "required",
        }
    );
    const defaultOption = createElement(
        "option",
        {},
        {
            textContent: "select a month",
            selected: "selected",
            disabled: "disabled",
            hidden: "hidden"
        }
    );

    monthSelect.appendChild(defaultOption);

    const months = [
        "Jan", "Feb", "Mar",
        "Apr", "May", "Jun",
        "Jul", "Aug", "Sep",
        "Oct", "Nov", "Dec"
    ];

    for (const month of months) {
        const option = createElement(
            "option",
            {
                "value": month,
                "style": "color: #000;"
            },
            {
                textContent: month
            }
        );

        monthSelect.appendChild(option);
    }

    monthSelect.addEventListener("change", () => {
        monthSelect.classList.remove("placeholder");
    });

    return monthSelect;
};
