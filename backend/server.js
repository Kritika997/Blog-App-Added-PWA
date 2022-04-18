const express = require("express");
const db = require("./model/db_connect");
const signup = require("./controllers/signupAndLogin");
const route = require("./routers/routes");
const morgan = require('morgan');
const bodyParser = require("body-parser");
const cors = require("cors");
const webPush = require("web-push")
// const public = require("./public/index.html");

const publicKey = 'BAP0qCWtZ7JMndTmAIuv0LfJpZXMXgWBj6XeKGFCpmP-ysLOmqOYp7rLCTa4SqPcFc9K76nJ_p2RvRE-1-a_pj8';
const privateKey = 'BE_58i93Jn0aPYaB-wiByU4b3B73z-ZoqcIosR1H5FY';

const sub = {
    "endpoint": "https://wns2-sg2p.notify.windows.com/w/?token=BQYAAAAuhTaNPzU%2fKKkn4wtubRiCY8YDSj4t0Q7vFCGfj2DQY2iymYyDgPSHRiAHBJDH5ov0jkTo2lFzGb3%2f6OmRPOkiuiOcc5DQBFrCxLQ05y0EscrUzUCzWqstwwxetOTIQlpJobJxFMND3zsIQf59Y5ix6gXY8ragq8ebsPWTbaPbWddaEkXLAeaJZGujsQbi0cWo1mSD%2bOoA8TfYcC7iIJGgnIQL7mFxpx%2bGZZAYN2xUWFVkg2rRwGCPFAfUL9dR1tzixheF0l6unFqw20JGJGMeGquim80p0vvU1eW1XRamtQKj6xL4f1urB8cRnyM9pnI%3d",
    "expirationTime": null,
    "keys": {
        "p256dh": "BM11Hxpme4I1hVgE09V2Xx93TDhRGZ1dCcLoKwuAsLYlyfgbqen2_OlokLc8Z_8VyUYYGVeYMXNI_EEB16bMatQ",
        "auth": "C8UjRp-7AtDn0XljGYWrsw"
    }

}  

webPush.setVapidDetails('mailto:kritika@infistack.com', publicKey, privateKey )

const payload = {
    notification: {
        title: "New Notification!",  
        data: {
            onActionClick: {
                "default": { "operation": "openWindow", "url": "foo" }
            }
        },
        vibrate:[100,50,100]
    }
}

webPush.sendNotification(sub, JSON.stringify(payload))

var app = express();
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

app.use(express.json());

app.use('/', route);

app.listen(8080, () => {
    console.log("server is running......");
}); 
