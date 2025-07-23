import User from '../models/user.js';
import generateToken from '../utils/jwt.js';

/**
 * Controller para registrar um novo usuário.
 */
const register = async (req, res) => {
const { nome, email, password } = req.body;

try {
    // Verifica se o usuário já existe
    const userExists = await User.findOne({ email });
    if (userExists) {
    return res.status(400).json({ message: 'Este email já está em uso.' });
    }

    // Cria o novo usuário (a senha será criptografada pelo hook no model)
    const user = await User.create({
        nome,
        email,
        password,
    });
    
    // Gera o token e envia a resposta
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

/**
 * Controller para autenticar (login) um usuário.
 */
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Validação básica
    if (!email || !password) {
        return res.status(400).json({ message: 'Por favor, forneça email e senha.' });
    }

    // Procura o usuário e inclui a senha na busca
    const user = await User.findOne({ email }).select('+password');

    // Verifica se o usuário existe e se a senha está correta
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Email ou senha inválidos.' });
    }

    // Gera o token e envia a resposta
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
