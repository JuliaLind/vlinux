
import { createElement } from "./utils.js";
import { createFormOptions } from "./form-options.js";

/**
 * Creates all the main elements and adds to the main container.
 * @param {HTMLDivElement} container the main div to add new
 * components too
 */
export const addFormSelector = (container) => {
    const forms = createFormOptions();
    const formSelector = createElement("select.main-menu");
    const formContainer = createElement("div.form-container");
    const helpContainer = createElement(
        "div.help-container.hidden",
        {},
        {
            innerHTML: `<p>Choose from the select menu what 
            type of search you wish to do.</p>
            <p> The content of this info note will change depending on the type
            of query you have selected.</p>
            <p>You can close this note by clicking on it or 
            on the info-symbol. Re-open the note again at 
            any time by clicking on the info-symbol again.</p>`
        }
    );

    const infoBtn = createElement(
        "span.material-symbols-outlined.info-btn",
        {},
        {
            innerText: "info"
        }
    );

    infoBtn.addEventListener("click", () => {
        helpContainer.classList.toggle("hidden");
    });
    helpContainer.addEventListener("click", () => {
        helpContainer.classList.toggle("hidden");
    });

    const formselectorContainer = createElement("div.formselector-container");

    formselectorContainer.appendChild(formSelector);
    formselectorContainer.appendChild(infoBtn);
    container.appendChild(formselectorContainer);
    container.appendChild(helpContainer);

    const defaultOption = createElement(
        "option",
        {},
        {
            textContent: "click here and select a query-type",
            selected: "selected",
            disabled: "disabled",
            hidden: "hidden"
        }
    );

    formSelector.appendChild(defaultOption);
    Object.keys(forms).forEach((form) => {
        const option = createElement(
            "option",
            {
                "value": form
            },
            {
                textContent: forms[form].descr
            }
        );

        formSelector.appendChild(option);
    });
    formSelector.addEventListener("change", () => {
        formContainer.replaceChildren(forms[formSelector.value].form);
        helpContainer.innerHTML = forms[formSelector.value].info;
    });

    container.appendChild(formContainer);
};
