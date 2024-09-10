const ToDo = require('../models/ToDo');

exports.createToDo = async (req, res) => {
  try {
    const toDo = new ToDo(req.body);
    await toDo.save();
    res.status(201).json({ message: 'To-Do created successfully', toDo });
  } catch (err) {
    res.status(500).json({ message: 'Error creating To-Do', error: err.message });
  }
};


exports.getAllToDos = async (req, res) => {
  const { page = 1 } = req.query;
  const limit = 10;
  try {
    const totalToDos = await ToDo.countDocuments();
    const totalPages = Math.ceil(totalToDos / limit);
    const toDos = await ToDo.find()
      .populate('client')
      .limit(limit)
      .skip((page - 1) * limit);

    res.json({ toDos, totalToDos, totalPages });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching To-Dos', error: err.message });
  }
};

exports.getToDoById = async (req, res) => {
  const { id } = req.params;
  try {
    const toDo = await ToDo.findById(id).populate('client');
    if (!toDo) {
      return res.status(404).json({ message: 'To-Do not found' });
    }
    res.json(toDo);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching To-Do', error: err.message });
  }
};

exports.getToDosByClient = async (req, res) => {
  const { clientId } = req.params;
  try {
    const toDos = await ToDo.find({ client: clientId }).populate('client');
    if (toDos.length === 0) {
      return res.status(404).json({ message: 'No To-Dos found for this client' });
    }
    res.json(toDos);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching To-Dos by client', error: err.message });
  }
};

exports.updateToDo = async (req, res) => {
  const { id } = req.params;
  try {
    const toDo = await ToDo.findByIdAndUpdate(id, req.body, { new: true });
    if (!toDo) {
      return res.status(404).json({ message: 'To-Do not found' });
    }
    res.status(200).json({ message: 'To-Do updated successfully', toDo });
  } catch (err) {
    res.status(500).json({ message: 'Error updating To-Do', error: err.message });
  }
};

exports.deleteToDo = async (req, res) => {
  const { id } = req.params;
  try {
    const toDo = await ToDo.findByIdAndDelete(id);
    if (!toDo) {
      return res.status(404).json({ message: 'To-Do not found' });
    }
    res.status(200).json({ message: 'To-Do deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting To-Do', error: err.message });
  }
};
