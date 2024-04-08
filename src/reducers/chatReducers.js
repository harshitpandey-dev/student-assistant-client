import {
    CHAT_FAIL,
    CHAT_REQUEST,
    CHAT_SUCCESS
} from '../types/chatConstants'

export const getCHAT = (state = {}, action) => {
    switch (action.type) {
        case CHAT_REQUEST:
            return {
                loading: true,
            }

        case CHAT_SUCCESS:
            return {
                loading: false,
                userData: action.payload,
            }
        case CHAT_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        default:
            return state
    }
}

