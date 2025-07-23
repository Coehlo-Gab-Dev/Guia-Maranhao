import mongoose from 'mongoose';


const servicoSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: [true, 'O nome do serviço é obrigatório.'],
      trim: true,
      index: true,
    },
    categoria: {
      type: String,
      required: [true, 'A categoria é obrigatória.'],
      enum: ['saude', 'educacao', 'cultura', 'social'],
      index: true,
    },
    municipioId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Municipio',
      required: true,
    },
    endereco: {
      logradouro: { type: String },
      numero: { type: String },
      bairro: { type: String },
      cep: { type: String },
      textoCompleto: {
        type: String,
        required: true,
      },
    },
    localizacao: {
      type: {
        type: String,
        enum: ['Point'],
        required: true,
      },
      coordinates: {
        type: [Number], 
        required: true,
      },
    },
    contato: {
      telefone: { type: String },
      email: { type: String },
    },
    horarioFuncionamento: { type: String },
    fonteDados: {
      origem: {
        type: String,
        required: true,
        enum: ['google_places', 'prefeitura', 'manual'],
      },
      placeId: {
        type: String,
        unique: true,
        sparse: true, 
      },
      ultimaVerificacao: { type: Date },
    },
    detalhesAdicionais: {
      acessibilidade: { type: [String] },
      publicoAlvo: { type: [String] }, 
    },
    ativo: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

servicoSchema.index({ localizacao: '2dsphere' });

const Servico = mongoose.model('Servico', servicoSchema);

export default Servico;
