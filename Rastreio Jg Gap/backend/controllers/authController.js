const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const transporter = require('../config/email');
const { validateCPF, validateEmail } = require('../utils/validators');
require('dotenv').config();

exports.register = async (req, res) => {
  const { username, password, confirmPassword, email, confirmEmail, cpf, birthdate } = req.body;

  // Verificações de senha e email
  if (password !== confirmPassword || email !== confirmEmail) {
    return res.status(400).json({ message: 'Confirmação de senha ou email não correspondem.' });
  }
  if (!validateCPF(cpf) || !validateEmail(email)) {
    return res.status(400).json({ message: 'CPF ou email inválido.' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      password: hashedPassword,
      email,
      cpf,
      birthdate,
    });
    res.status(201).json({ message: 'Usuário cadastrado com sucesso', userId: newUser.id });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao registrar usuário', error });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ where: { username } });
    if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Credenciais inválidas' });

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ message: 'Login bem-sucedido', token });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao fazer login', error });
  }
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: 'Email não encontrado' });

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '15m' });
    const link = `http://localhost:3000/reset-password/${token}`;

    await transporter.sendMail({
      to: user.email,
      subject: 'Recuperação de senha',
      text: `Use o link a seguir para redefinir sua senha: ${link}`,
    });
    res.status(200).json({ message: 'Email de recuperação enviado' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao enviar email de recuperação', error });
  }
};
