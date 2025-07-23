import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';


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
      select: false, 
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

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};


const User = mongoose.model('User', userSchema);

export default User;
