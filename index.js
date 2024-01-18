const express = require("express");
const jwt = require("jsonwebtoken");

const secret = process.env.secret;
const app = express();


app.post("/token", (req, res) => {
    // Get user form DB
    const { id: sub, name } = { id: "nodeapis", name:"Mike" };
    const token = jwt.sign({
        sub,
        name,
        exp: Date.now() + 6 * 1000
    }, secret);
    res.send({token});
});

app.post("/public", (req, res) => {
    res.send("I'm public");
});

app.post("/private", (req, res) => {
        try {
        //  fkjsfshTCRRTDgfd
        const token = req.headers.authorization.split(" ")[1];
        const payload = jwt.verify(token, secret);
        if (Date.now() > payload.exp) {
            return res.status(401).send({error: "token expired"});
        }
        res.send("I'm private");
    } catch (error) {
        res.status(401).send({error:error.message});
    }
});

app.listen(3000);