import express from "express";

const router = express.Router();

export default ({ Client }) => {
  router.get("/all", async (req, res) => {
    const result = await Client.find({});
    res.json(result);
  });

  router.post("/", async (req, res) => {
    const client = await Client.create(req.body);
    await client.save();
    res.status(200).json({
      successful: true,
    });
  });

  return router;
};
