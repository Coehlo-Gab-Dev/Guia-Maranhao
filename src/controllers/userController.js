import User from '../models/user.js';
import Servico from '../models/servico.js';

const addFavorito = async (req, res) => {
  const { servicoId } = req.body;
  const userId = req.user._id; 

  try {
    const servico = await Servico.findById(servicoId);
    if (!servico) {
      return res.status(404).json({ message: 'Serviço não encontrado.' });
    }

    await User.findByIdAndUpdate(userId, {
      $addToSet: { favoritos: { servicoId: servicoId } },
    });

    res.status(200).json({ message: 'Serviço adicionado aos favoritos com sucesso!' });
  } catch (error) {
    console.error('❌ Erro ao adicionar favorito:', error);
    res.status(500).json({ message: 'Erro interno no servidor.' });
  }
};


const removeFavorito = async (req, res) => {
  const { servicoId } = req.params;
  const userId = req.user._id;

  try {
    await User.findByIdAndUpdate(userId, {
      $pull: { favoritos: { servicoId: servicoId } },
    });

    res.status(200).json({ message: 'Serviço removido dos favoritos com sucesso!' });
  } catch (error) {
    console.error('❌ Erro ao remover favorito:', error);
    res.status(500).json({ message: 'Erro interno no servidor.' });
  }
};


const getFavoritos = async (req, res) => {
  const userId = req.user._id;

  try {
    const user = await User.findById(userId).populate({
        path: 'favoritos.servicoId',
        model: 'Servico',
        populate: { 
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


const getMe = async (req, res) => {
    res.status(200).json(req.user);
};


export { addFavorito, removeFavorito, getFavoritos, getMe };
