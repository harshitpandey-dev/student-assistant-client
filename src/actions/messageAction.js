import axios from "axios";
import {
    MESSAGE_FAIL,
    MESSAGE_REQUEST,
    MESSAGE_SUCCESS,
    MESSAGE_SEND_FAIL,
    MESSAGE_SEND_REQUEST,
    MESSAGE_SEND_SUCCESS
} from '../types/messageConstants'

export const getMessage = (chatID,token) => async (dispatch) => {
    try {
        dispatch({
            type: MESSAGE_REQUEST,
        });
        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
                Authorization: `Bearer ${token}`,
            },
        };
        const { data } = await axios.get(
            `/api/message/${chatID}`,
            config
        );
        dispatch({
            type: MESSAGE_SUCCESS,
            payload: data.data,
        });

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

export const postMessage = (chatID,formData,token) => async (dispatch) => {
   try{
       dispatch({
           type: MESSAGE_SEND_REQUEST,
       });
    const config = {
        headers: {
            "Content-Type": "multipart/form-data",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
            Authorization: `Bearer ${token}`,
        },
    };
       const {data}=await axios.post(`/api/message/${chatID}`, formData, config);

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
