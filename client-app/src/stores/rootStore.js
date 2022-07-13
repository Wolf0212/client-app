import { init } from "@rematch/core";
import { userModel } from "./models/userModel.js";

const models = {
    userModel,
}

const rootStore = init({models});

export default rootStore;