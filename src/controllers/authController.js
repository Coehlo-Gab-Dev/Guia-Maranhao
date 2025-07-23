import User from '../models/user.js';
import generateToken from '../utils/jwt.js';

const register = async (req, res) => {
const { nome, email, password } = req.body;

try {
    const userExists = await User.findOne({ email });
    if (userExists) {
    return res.status(400).json({ message: 'Este email já está em uso.' });
    }

    const user = await User.create({
        nome,
        email,
        password,
    });
    
    const token = generateToken(user._id);
    res.status(201).json({
        message: 'Usuário registrado com sucesso!',
        token,
        user: {
        id: user._id,
        nome: user.nome,
        email: user.email,
        },
    });

    } catch (error) {
    console.error('❌ Erro no registro de usuário:', error);
    res.status(500).json({ message: 'Erro interno no servidor.', error: error.message });
    } 
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
        return res.status(400).json({ message: 'Por favor, forneça email e senha.' });
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Email ou senha inválidos.' });
    }

    const token = generateToken(user._id);
    res.status(200).json({
      message: 'Login bem-sucedido!',
      token,
      user: {
        id: user._id,
        nome: user.nome,
        email: user.email,
      },
    });

  } catch (error) {
    console.error('❌ Erro no login:', error);
    res.status(500).json({ message: 'Erro interno no servidor.' });
  }
};

export { register, login };
