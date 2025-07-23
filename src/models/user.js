import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

/**
 * Schema do Mongoose para a coleção 'users'.
 * Armazena dados dos usuários da aplicação.
 */
const userSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: [true, 'O nome é obrigatório.'],
    },
    email: {
      type: String,
      required: [true, 'O email é obrigatório.'],
      unique: true,
      lowercase: true,
      index: true,
      match: [/\S+@\S+\.\S+/, 'Por favor, use um email válido.'],
    },
    password: {
      type: String,
      required: [true, 'A senha é obrigatória.'],
      minlength: [6, 'A senha deve ter no mínimo 6 caracteres.'],
      select: false, // Não retorna o campo 'password' em consultas por padrão
    },
    favoritos: [
      {
        servicoId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Servico',
        },
        adicionadoEm: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Middleware (hook) do Mongoose para criptografar a senha ANTES de salvar o usuário
userSchema.pre('save', async function (next) {
  // Executa a criptografia apenas se a senha foi modificada (ou é nova)
  if (!this.isModified('password')) {
    return next();
  }

  // Gera o "sal" e criptografa a senha
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Método para comparar a senha fornecida com a senha criptografada no banco
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};


const User = mongoose.model('User', userSchema);

export default User;
