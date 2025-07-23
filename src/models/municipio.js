import mongoose from 'mongoose';

/**
 * Schema do Mongoose para a coleção 'municipios'.
 * Armazena os municípios do estado do Maranhão.
 */
const municipioSchema = new mongoose.Schema(
  {
    // ID numérico fornecido pela API do IBGE. É único e indexado para buscas rápidas.
    ibgeId: {
      type: Number,
      required: [true, 'O ID do IBGE é obrigatório.'],
      unique: true,
      index: true,
    },
    // Nome do município.
    nome: {
      type: String,
      required: [true, 'O nome do município é obrigatório.'],
      trim: true,
    },
    // Sigla da Unidade Federativa (Estado). Padrão 'MA'.
    uf: {
      type: String,
      required: true,
      default: 'MA',
    },
  },
  {
    // Adiciona automaticamente os campos createdAt e updatedAt.
    timestamps: true,
    versionKey: false, // Desativa o campo __v
  }
);

// Cria o modelo 'Municipio' a partir do schema.
const Municipio = mongoose.model('Municipio', municipioSchema);

export default Municipio;
