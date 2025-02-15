import { useContext } from "react";
import SocketContext from "@/context/socketContext";
function useSocket() {
  const socket = useContext(SocketContext);
  console.log("socket:", socket);
  if (!socket) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return socket;
}

export default useSocket;
