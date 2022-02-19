
import "./App.css";
import Zoom from "./Zoom";
import { useState } from "react";

function App() {
    const [joinMeeting, setJoinMeeting] = useState(false);
    return (
        <div className="App">
            {joinMeeting ? (
                <Zoom />
            ) : (
                <>
                    <h1>Zoom meeting</h1>
                    <button className="btn btn-zoom"
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
