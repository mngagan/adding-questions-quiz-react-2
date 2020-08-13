"use strict";

import alt from "../alt";
import { createActions } from "alt-utils/lib/decorators";

/**
 * Actions for filters
 * @see "../stores/filter-store"
 */
class quizActions {
    constructor() {
        this.generateActions(
            "updateState",
        );
    }
}

export default createActions(alt)(quizActions);  
