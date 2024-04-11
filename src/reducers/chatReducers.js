import {
    CHAT_FAIL,
    CHAT_REQUEST,
    CHAT_SUCCESS,
    CHAT_RESET,
    CHAT_LIST_REQUEST,
    CHAT_LIST_SUCCESS,
    CHAT_LIST_FAIL,
    CHAT_LIST_RESET,
    CHAT_DELETE_REQUEST,
    CHAT_DELETE_SUCCESS,
    CHAT_DELETE_FAIL
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

export const deleteChat = (state = {}, action) => {
    switch (action.type) {
        case CHAT_DELETE_REQUEST:
            return {
                loading: true,
            }

        case CHAT_DELETE_SUCCESS:
            return {
                loading: false,
                success: true,
            }
        case CHAT_DELETE_FAIL:
            return {
                loading: false,
                error: action.payload,
            }

        default:
            return state
    }
}