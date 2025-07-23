import User from '../models/user.js';
import Servico from '../models/servico.js';

/**
 * Controller para adicionar um serviço aos favoritos do usuário logado.
 */
const addFavorito = async (req, res) => {
  const { servicoId } = req.body;
  const userId = req.user._id; // ID do usuário vem do middleware 'protect'

  try {
    const servico = await Servico.findById(servicoId);
    if (!servico) {
      return res.status(404).json({ message: 'Serviço não encontrado.' });
    }

    // Adiciona o serviço ao array de favoritos do usuário, se ainda não existir
    await User.findByIdAndUpdate(userId, {
      $addToSet: { favoritos: { servicoId: servicoId } },
    });

    res.status(200).json({ message: 'Serviço adicionado aos favoritos com sucesso!' });
  } catch (error) {
    console.error('❌ Erro ao adicionar favorito:', error);
    res.status(500).json({ message: 'Erro interno no servidor.' });
  }
};

/**
 * Controller para remover um serviço dos favoritos do usuário logado.
 */
const removeFavorito = async (req, res) => {
  const { servicoId } = req.params;
  const userId = req.user._id;

  try {
    // Remove o serviço do array de favoritos
    await User.findByIdAndUpdate(userId, {
      $pull: { favoritos: { servicoId: servicoId } },
    });

    res.status(200).json({ message: 'Serviço removido dos favoritos com sucesso!' });
  } catch (error) {
    console.error('❌ Erro ao remover favorito:', error);
    res.status(500).json({ message: 'Erro interno no servidor.' });
  }
};

/**
 * Controller para listar todos os serviços favoritados pelo usuário logado.
 */
const getFavoritos = async (req, res) => {
  const userId = req.user._id;

  try {
    const user = await User.findById(userId).populate({
        path: 'favoritos.servicoId',
        model: 'Servico',
        populate: { // Popula também o município dentro do serviço
            path: 'municipioId',
            model: 'Municipio',
            select: 'nome uf'
        }
    });

    if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado.'});
    }

    res.status(200).json(user.favoritos);
  } catch (error) {
    console.error('❌ Erro ao listar favoritos:', error);
    res.status(500).json({ message: 'Erro interno no servidor.' });
  }
};

/**
 * Controller para obter o perfil do usuário logado.
 */
const getMe = async (req, res) => {
    // O objeto req.user já foi populado pelo middleware 'protect'
    res.status(200).json(req.user);
};


export { addFavorito, removeFavorito, getFavoritos, getMe };
