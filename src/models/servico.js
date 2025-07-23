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
    // Referência ao município onde o serviço está localizado.
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
      // Endereço completo formatado para fácil exibição.
      textoCompleto: {
        type: String,
        required: true,
      },
    },
    // Coordenadas geográficas para funcionalidades de mapa e proximidade.
    localizacao: {
      type: {
        type: String,
        enum: ['Point'],
        required: true,
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        required: true,
      },
    },
    contato: {
      telefone: { type: String },
      email: { type: String },
    },
    horarioFuncionamento: { type: String },
    // Rastreabilidade da origem dos dados, essencial para a resiliência.
    fonteDados: {
      origem: {
        type: String,
        required: true,
        enum: ['google_places', 'prefeitura', 'manual'],
      },
      // ID do local no Google Places, se aplicável.
      placeId: {
        type: String,
        unique: true,
        sparse: true, // Permite valores nulos, mas os valores existentes devem ser únicos.
      },
      ultimaVerificacao: { type: Date },
    },
    detalhesAdicionais: {
      acessibilidade: { type: [String] }, // Ex: ['rampa', 'banheiro_adaptado']
      publicoAlvo: { type: [String] }, // Ex: ['idosos', 'criancas']
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

// Cria um índice geoespacial para otimizar consultas baseadas em localização.
servicoSchema.index({ localizacao: '2dsphere' });

const Servico = mongoose.model('Servico', servicoSchema);

export default Servico;
