import axios from "axios";
import {
    MESSAGE_FAIL,
    MESSAGE_REQUEST,
    MESSAGE_SUCCESS,
    MESSAGE_SEND_FAIL,
    MESSAGE_SEND_REQUEST,
    MESSAGE_SEND_SUCCESS
} from '../types/messageConstants'

export const getMessage = (chatID) => async (dispatch, getState) => {
    try {
        dispatch({
            type: MESSAGE_REQUEST,
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
            `/api/messgae/${chatID}`,
            config
        );
        dispatch({
            type: MESSAGE_SUCCESS,
            payload: data,
        });
          console.log(data);

    } catch (error) {
        dispatch({
            type: MESSAGE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

//for sending message work left

export const sendMessage = (chatID,content) => async (dispatch, getState) => {
   try{
       dispatch({
           type: MESSAGE_SEND_REQUEST,
       });
    const {
        userLogin: { userData },
    } = getState();

    const config = {
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
            Authorization: `Bearer ${userData.token}`,
        },
    };
    await axios.post(`/api/message/${chatID}`, {content}, config);

    dispatch({
        type: MESSAGE_SEND_SUCCESS,
        payload: data.data,
    });
} catch (error) {
    dispatch({
        type: MESSAGE_SEND_FAIL,
        payload:
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
    });
}
}
