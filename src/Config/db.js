import mongoose from 'mongoose';
import 'dotenv/config';


const connectDB = async () => {
  try {
    // Tenta conectar ao MongoDB usando a string de conexão do .env
    await mongoose.connect(process.env.DB_URI);
    console.log('✅ Conexão com o MongoDB estabelecida com sucesso!');
  } catch (error) {
    // Em caso de erro na conexão, exibe o erro e finaliza a aplicação
    console.error('❌ Erro ao conectar com o MongoDB:', error.message);
    process.exit(1); // Encerra o processo com status de falha
  }
};

export default connectDB;
