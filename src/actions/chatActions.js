import axios from "axios";
import {
    CHAT_FAIL,
    CHAT_REQUEST,
    CHAT_SUCCESS
} from '../types/chatConstants'

export const get_Chat = (sellerID) => async (dispatch,getState) => {
    try {
        
        dispatch({
            type: CHAT_REQUEST,
        });
        const {
            userLogin: { userData },
        } = getState();
        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
                Authorization: `Bearer ${userData.token}`,

            },
        };
        const { data } = await axios.get(
            `/api/chat/c/${sellerID}`,
            config
        );
        dispatch({
            type: CHAT_SUCCESS,
            payload: data,
        });
      console.log(data);
    } catch (error) {
        dispatch({
            type: CHAT_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};
