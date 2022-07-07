import { init } from "@rematch/core";

import countStore from "./models/countStore";

const models = {
    countStore
}

const rootStore = init({ models });
export default rootStore;