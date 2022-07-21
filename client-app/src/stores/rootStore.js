import { init } from "@rematch/core";
import { userModel } from "./models/userModel.js";
import { postModel } from "./models/postModel.js";

const models = {
    userModel,
    postModel,
}

const rootStore = init({models});

export default rootStore;