import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    branch: null
}

export const branchSlice = createSlice({
    name: "branch",
    initialState,
    reducers: {
        setBranchName: (initialState, action) => {
            initialState.branch = action.payload
        }
    }
}
)

export default branchSlice.reducer
export const { setBranchName } = branchSlice.actions