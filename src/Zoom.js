import "./Zoom.css";
import { ZoomMtg } from "@zoomus/websdk";
import { useEffect, useState } from "react";
// import axios from "axios";

const crypto = require("crypto");

function generateSignature(apiKey, apiSecret, meetingNumber, role) {
    return new Promise((res, rej) => {
        // Prevent time sync issue between client signature generation and zoom
        const timestamp = new Date().getTime() - 30000;

        const msg = Buffer.from(
            apiKey + meetingNumber + timestamp + role
        ).toString("base64");
        const hash = crypto
            .createHmac("sha256", apiSecret)
            .update(msg)
            .digest("base64");
        const signature = Buffer.from(
            `${apiKey}.${meetingNumber}.${timestamp}.${role}.${hash}`
        ).toString("base64");

        res(signature);
    });
}

// useEffect(() => {
// const zoomMeeting = () => {
//     const data = {
//         email: "nafiza.aobs@gmail.com",
//     };
//     // console.log(username);
//     axios
//         .post(`http://localhost:3666/meeting`, data)
//         .then((response) => {
//             let URL = response.data.join_url;
//             // .replaceAll(
//             // "https://us04web.zoom.us/s/",
//             // "http://localhost:9998/?"
//             // ) + `?role=1?name=nafiz`;

//             console.log(URL);
//             let t = URL.split("j/");
//             let r = t[1].split("?");
//             //console.log(r);
//             let linkk = r[0];
//             let p = r[1].split("=");
//             //console.log(p[1]);
//             //console.log(linkk);

//             return [linkk, p];
//             // window.location.replace(`${URL}`);
//         })
//         .catch((err) => console.error(err));
// };
// }, []);

var apiKey = "MVfVOSCEQwGZNKFD2slZ-w";
var apiSecret = "dXNpRJHw9Oeme5tqiNEvpBsJ8EfOh0UDBB25";
var meetingNumber = "";
var leaveUrl = "http://localhost:3000"; // our redirect url
var userName = "";
var userEmail = "nafiza.aobs@gmail.com";
var passWord = "";

var signature = "";
generateSignature(apiKey, apiSecret, meetingNumber, 0).then((res) => {
    signature = res;
}); // need to generate based on meeting id - using - role by default 0 = javascript

// let [meetId, meetPwd] = zoomMeeting();

// meetingNumber = meetId;
// passWord = meetPwd;

const Zoom = () => {
    const [link, setLink] = useState({});

    useEffect(() => {
        const reqData = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: "nafiza.aobs@gmail.com" }),
        };
        fetch("http://localhost:3666/meeting", reqData)
            .then((res) => res.json())
            .then((data) => setLink(data.join_url));
    }, []);

    /*console.log(data.join_url)*/

    let urlLink = link;
    let mainId = urlLink.split("j/");
    console.log(mainId);
    let r = mainId[1].split("?");
    console.log(r);
    let linkk = r[0];
    let p = r[1].split("=");
    console.log(p[1]);
    console.log(linkk);

    // loading zoom libraries before joining on component did mount
    useEffect(() => {
        showZoomDIv();
        ZoomMtg.setZoomJSLib("https://source.zoom.us/1.9.0/lib", "/av");
        ZoomMtg.preLoadWasm();
        ZoomMtg.prepareJssdk();
        initiateMeeting();
    }, []);

    const showZoomDIv = () => {
        document.getElementById("zmmtg-root").style.display = "block";
    };

    const initiateMeeting = () => {
        ZoomMtg.init({
            leaveUrl: leaveUrl,
            isSupportAV: true,
            success: (success) => {
                console.log(success);
                ZoomMtg.join({
                    signature: signature,
                    meetingNumber: meetingNumber,
                    userName: userName,
                    apiKey: apiKey,
                    userEmail: userEmail,
                    passWord: passWord,
                    success: (success) => {
                        console.log(success);
                    },
                    error: (error) => {
                        console.log(error);
                    },
                });
            },
            error: (error) => {
                console.log(error);
            },
        });
    };

    return <div className="App">Zoom</div>;
};

export default Zoom;
