import { addFormSelector } from "./src/form-selector.js";
import { addResultTable } from "./src/result-table.js";

/**
 * Renders the main view of this single-page application
 */
function renderMainView() {
    const container = document.getElementById("container");

    container.innerHTML = "";
    addFormSelector(container);
    addResultTable(container);
}

renderMainView();
