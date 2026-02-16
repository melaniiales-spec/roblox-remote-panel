import express from "express";

const app = express();
app.use(express.json());

const sessions = new Map();

app.get("/", (req, res) => {
    res.send("Roblox Remote Panel Server Running");
});

app.post("/register", (req, res) => {
    const { sessionId, username, userId, placeId, jobId } = req.body;

    if (!sessionId) {
        return res.status(400).json({ ok: false, error: "Missing sessionId" });
    }

    sessions.set(sessionId, {
        username,
        userId,
        placeId,
        jobId,
        createdAt: Date.now()
    });

    console.log("New session:", sessionId, username);

    res.json({
        ok: true,
        controlLink: `https://your-panel/control/${sessionId}`
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server listening on port", PORT);
});
