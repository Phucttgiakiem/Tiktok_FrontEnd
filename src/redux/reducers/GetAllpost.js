import { INIT_STATE } from "constant";
import { GetAllpost } from "redux/actions";

export default function GetAllpostReducer (state = INIT_STATE.datapost,action){
    switch(action.type){
        case GetAllpost.GetpostRequest.toString():
            return {
                ...state,
            }
        case GetAllpost.GetpostSuccess.toString():
            return {
                ...state,
                postofuser: action.payload
            }
        case GetAllpost.GetpostFailure.toString():
            return {
                ...state
            }
        default:
            return state
    }
}