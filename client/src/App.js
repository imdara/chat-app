import io from "socket.io-client";
import { useState } from "react";
import Chat from "./Chat";

const socket = io.connect("http://localhost:4000");

const App = () => {
  const [username, setUsername] = useState("");
  const [roomId, setRoomId] = useState("");
  const [showChat, setShowChat] = useState(false);

  const submitHandler = () => {
    if (username !== "" && roomId !== "") {
      socket.emit("join_room", roomId);
      setShowChat(true);
    }
  };

  return (
    <>
      {!showChat ? (
        <>
          <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
              <div>
                <img
                  className="mx-auto h-12 w-auto"
                  src="https://cdn-icons-png.flaticon.com/512/134/134914.png"
                  alt="Workflow"
                />
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                  Join a room to start chatting
                </h2>
              </div>
              <form className="mt-8 space-y-6" onSubmit={submitHandler}>
                <input type="hidden" name="remember" defaultValue="true" />
                <div className="rounded-md shadow-sm -space-y-px">
                  <div>
                    <label htmlFor="username" className="sr-only">
                      username
                    </label>
                    <input
                      id="username"
                      name="username"
                      type="username"
                      required
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                      placeholder="Enter username"
                      onChange={(e) => {
                        setUsername(e.target.value);
                      }}
                    />
                  </div>
                  <div>
                    <label htmlFor="roomid" className="sr-only">
                      roomid
                    </label>
                    <input
                      id="roomid"
                      name="roomid"
                      type="roomid"
                      required
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                      placeholder="Enter roomid"
                      onChange={(e) => {
                        setRoomId(e.target.value);
                      }}
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Join room
                  </button>
                </div>
              </form>
            </div>
          </div>
          <footer class="w-screen absolute bottom-0 text-center bg-gray-100 text-gray-600">
            <div class="text-center p-6 bg-gray-200">
              <span>© 2022 Copyright:</span>
              <p class="text-gray-600 font-semibold">My Site</p>
            </div>
          </footer>
        </>
      ) : (
        <Chat socket={socket} username={username} roomId={roomId} />
      )}
    </>
  );
};

export default App;
