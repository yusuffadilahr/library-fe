'use client'

import store from "@/redux/store";

// import { PersistGate } from 'redux-persist/integration/react';
const { Provider } = require("react-redux")

const ReduxProvider = ({ children }) => {
    return (
        <Provider store={store}>
            {/* <PersistGate loading={null} persistor={persist}> */}
                {children}
            {/* </PersistGate> */}
        </Provider>
    )
}

export default ReduxProvider