import {
    CHAT_FAIL,
    CHAT_REQUEST,
    CHAT_SUCCESS,
    CHAT_RESET,
    CHAT_LIST_REQUEST,
    CHAT_LIST_SUCCESS,
    CHAT_LIST_FAIL,
    CHAT_LIST_RESET
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
                chatData: action.payload,
            }
        case CHAT_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
            case CHAT_RESET:
                return {}
        default:
            return state
    }
}

export const getAllCHAT = (state ={}, action) => {
    switch (action.type) {
        case CHAT_LIST_REQUEST:
            return {
                loading: true,
            }

        case CHAT_LIST_SUCCESS:
            return {
                loading: false,
                chatListData: action.payload,
            }
        case CHAT_LIST_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
            case CHAT_LIST_RESET:
                return {}
        default:
            return state
    }
}
