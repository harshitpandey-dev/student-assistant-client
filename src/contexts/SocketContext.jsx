/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import socketio from "socket.io-client";
import { useSelector } from "react-redux";

const getSocket = (token) => {
  return socketio("http://localhost:8000", {
    withCredentials: true,
    auth: { token },
  });
};

const SocketContext = createContext({
  socket: null,
});

const useSocket = () => useContext(SocketContext);

// eslint-disable-next-line react/prop-types
const SocketProvider = ({ children }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userData } = userLogin;

  const [socket, setSocket] = useState(null);

  // Set up the socket connection when the component mounts
  useEffect(() => {
    if (userData && userData.token) {
      const token = userData.token;
      const newSocket = getSocket(token);
      setSocket(newSocket);
    }
  }, [userData]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export { SocketProvider, useSocket };
