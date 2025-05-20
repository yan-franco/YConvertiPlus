// ./reducers/index.js
const initialState = {}; // Estado inicial

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case "EXAMPLE_ACTION":
            return { ...state, data: action.payload };
        default:
            return state;
    }
};

export default rootReducer;