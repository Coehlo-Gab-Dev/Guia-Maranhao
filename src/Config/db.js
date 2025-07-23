import mongoose from 'mongoose';
import 'dotenv/config';


const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log('✅ Conexão com o MongoDB estabelecida com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao conectar com o MongoDB:', error.message);
    process.exit(1);
  }
};

export default connectDB;
