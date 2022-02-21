import "./App.css";
import Zoom from "./Zoom";
import { useState } from "react";

function App() {
    const [joinMeeting, setJoinMeeting] = useState(false);
    const [username, setUsername] = useState("");

    return (
        <div className="App">
            {joinMeeting ? (
                <Zoom />
            ) : (
                <>
                    <h1>Zoom meeting</h1>
                    <input
                        type="text"
                        placeholder="Enter Name"
                        name="name"
                        style={{
                            width: "300px",
                            borderRadius: "5px",
                            padding: "8px 12px",
                            fontSize: "20px",
                        }}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <button
                        className="btn btn-zoom"
                        style={{ border: "1px solid #fff" }}
                        onClick={() => setJoinMeeting(true)}
                    >
                        Join Meeting
                    </button>
                </>
            )}
        </div>
    );
}

export default App;
