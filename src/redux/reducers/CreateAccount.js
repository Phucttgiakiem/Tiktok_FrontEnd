import { INIT_STATE } from "constant";
import { CreateAccount } from "redux/actions";

export default function CreateCodeEmailRgtReducer (state = INIT_STATE.codegetpass,action){
    switch(action.type){
        case CreateAccount.createaccountRequest.toString():
            return {
                ...state,
            }
        case CreateAccount.createaccountSuccess.toString():
            return {
                ...state,
                result: action.payload
            }
        case CreateAccount.createaccountFailure.toString():
            return {
                ...state
            }
        case CreateAccount.createaccountReset.toString():
            return {
                result: null
            }
        default:
            return state;
    }
}