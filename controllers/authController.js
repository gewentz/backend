const User = require ('../models/User.js')
const generateToken = require ('../utils/token.js')

exports.register = async (req, res) => {
  const { email, password, name } = req.body;
  try {
    const user = new User({ email, password, name });
    await user.save();
    const token = generateToken(user._id);
    res.status(201).json({ token });
  } catch (err) {
    res.status(500).json({ error: `Erro ao registrar o usuário. ${err.message}` });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: `Usuário não encontrado.` });

    const token = generateToken(user._id);
    res.status(200).json({ token });
  } catch {
    res.status(500).json({ error: `Erro ao fazer login. ${err.message}` });
  }
};
