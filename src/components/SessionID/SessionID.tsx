import * as React from "react";
import {useEffect, useState} from "react";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../Redux-Toolkit/Store/Store";
import {clearSessionID, setSessionID} from "../Redux-Toolkit/Slices/SessionIDSlice";

type SessionIDProps = {
  //
};

const SessionID: React.FC<any> = () => {
    const {session} = useSelector((state: RootState) => state.sessionid);
    const dispatch = useDispatch();
    useEffect(() => {
        const getSession = async () => {
            await axios.get(`${process.env.REACT_APP_API_BASE_URL}/sm/session/`, {withCredentials: true})
                .then((response: any) => {
                    dispatch(setSessionID(response.data.session_id));


                })
                .catch((error: any) => {
                    dispatch(clearSessionID());
                });

        };
        getSession();

    },[]);

    return <>{session}</>;
};

export default SessionID;
