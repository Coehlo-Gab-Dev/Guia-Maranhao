import mongoose from 'mongoose';


const municipioSchema = new mongoose.Schema(
  {
    ibgeId: {
      type: Number,
      required: [true, 'O ID do IBGE é obrigatório.'],
      unique: true,
      index: true,
    },
    nome: {
      type: String,
      required: [true, 'O nome do município é obrigatório.'],
      trim: true,
    },
    uf: {
      type: String,
      required: true,
      default: 'MA',
    },
  },
  {
    timestamps: true,
    versionKey: false, 
  }
);

const Municipio = mongoose.model('Municipio', municipioSchema);

export default Municipio;
