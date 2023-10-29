import { createElement } from "./utils.js";

/**
 * Loader displays while waiting for results from server
 */
const loader = {
    /**
     * Shows the loader
     */
    show: function show() {
        const check = document.querySelector(".loader");

        if (check == null) {
            const myLoader = createElement("div.loader");

            document.body.appendChild(myLoader);
        }
    },

    /**
     * Hides the loader
     */
    hide: function hide() {
        const myLoader = document.querySelector(".loader");

        if (myLoader != null) {
            myLoader.classList.add("loader--hidden");
            myLoader.addEventListener("transitionend", () => {
                myLoader.remove();
            });
        }
    }
};

export default loader;
