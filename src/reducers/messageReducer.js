import {
    MESSAGE_FAIL,
    MESSAGE_REQUEST,
    MESSAGE_SUCCESS,
    MESSAGE_SEND_FAIL,
    MESSAGE_SEND_REQUEST,
    MESSAGE_SEND_SUCCESS
} from '../types/messageConstants'

export const getMESSAGE = (state = {}, action) => {
    switch (action.type) {
        case MESSAGE_REQUEST:
            return {
                loading: true,
            }

        case MESSAGE_SUCCESS:
            return {
                loading: false,
                userData: action.payload,
            }
        case MESSAGE_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        default:
            return state
    }
}

export const postMESSAGE = (state = {}, action) => {
    switch (action.type) {
        case MESSAGE_SEND_REQUEST:
            return {
                loading: true,
            }

        case MESSAGE_SEND_SUCCESS:
            return {
                loading: false,
                userData: action.payload,
            }
        case MESSAGE_SEND_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        default:
            return state
    }
}

