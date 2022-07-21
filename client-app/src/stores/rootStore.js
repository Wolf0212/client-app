import { init } from "@rematch/core";
import { userModel } from "./models/userModel.js";
import { postModel } from "./models/postModel.js";
import { globalModel } from "./models/globalModel.js";
import { commentModel } from "./models/commentModel.js";


const models = {
    userModel,
    postModel,
    globalModel,
    commentModel,
}

const rootStore = init({ models });

export default rootStore;