const router = require("express").Router();
const Task = require("../models/Task");
const auth = require("../middleware/auth");

// ✅ CREATE TASK
router.post("/", auth, async (req, res) => {
  const { title, assignedTo, project, dueDate } = req.body;

  const task = await Task.create({
    title,
    assignedTo,
    project,
    dueDate,
    status: "todo"
  });

  res.json(task);
});

// ✅ GET TASKS
router.get("/", auth, async (req, res) => {
  const tasks = await Task.find().populate("assignedTo project");
  res.json(tasks);
});

// ✅ UPDATE FULL TASK
router.put("/:id", auth, async (req, res) => {
  const updated = await Task.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(updated);
});

// ✅ UPDATE STATUS ONLY
router.put("/:id/status", auth, async (req, res) => {
  const task = await Task.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true }
  );

  res.json(task);
});

module.exports = router;