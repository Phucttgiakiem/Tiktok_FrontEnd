import { INIT_STATE } from "constant";
import { addhistory,removehistory } from "redux/actions";

const ComebackLogin = (state = INIT_STATE.comebackpageLogin, action) => {
    switch (action.type) {
        case addhistory.toString():
            return {
                    ...state,
                    history: [...state.history.filter(item => item !== action.payload), action.payload],
                };
        case removehistory.toString():
            return {
                ...state,
                history: state.history.filter(item => item !== action.payload),
            };
        default:
            return state;
    }
};

export default ComebackLogin;