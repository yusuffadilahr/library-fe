import { configureStore } from "@reduxjs/toolkit";
import branchReducer  from "./slice/branch.slice";

const store = configureStore({
    reducer: {
        branch: branchReducer
    }
})

export default store