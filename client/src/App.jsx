import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import "./app.css";

// coneccion al backend
const socket = io.connect("http://localhost:3009");

export default function App() {
  const [state, setState] = useState({ message: "", name: "" });
  const [chat, setChat] = useState([]);

  useEffect(() => {
    socket.emit("initial_data", "perromensaje");
    // const res = socket.on("backend");
    // console.log(res);
    socket.on("output_from_server", (algo) => {
      // setChat([...chat, { name, message }]);
      console.log(algo);
    });
  }, []);

  const onMessageSubmit = (e) => {
    e.preventDefault();
    // const { name, message } = state;
    // socket.emit("frontend", { name, message });
    // setState({ message: "", name: "" });
    socket.emit("input_from_client", "gatomensaje");
  };

  const renderChat = () => {
    return chat.map(({ name, message }, index) => (
      <div key={index}>
        <h2>
          {name}: {message}
        </h2>
      </div>
    ));
  };

  return (
    <div className="app">
      <h1>Messanger</h1>
      <form onSubmit={onMessageSubmit}>
        <div className="form-container">
          <input
            type="text"
            onChange={(e) => setState({ ...state, name: e.target.value })}
            value={state.name}
          />
          <textarea
            value={state.message}
            onChange={(e) => setState({ ...state, message: e.target.value })}
          ></textarea>
          <button onClick={() => console.log("Hola mundo")}>Enviar</button>
        </div>

        <div className="render-chat">{renderChat()}</div>
      </form>
    </div>
  );
}
