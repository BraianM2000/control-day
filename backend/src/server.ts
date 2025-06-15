// src/server.ts
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import app from './app'

dotenv.config()

const PORT = process.env.PORT || 5000

// Conectar a MongoDB
mongoose.connect(process.env.MONGO_URI as string)
  .then(() => {
    console.log('Conectado a MongoDB')
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en puerto ${PORT}`)
    })
  })
  .catch(err => {
    console.error('Error conectando a MongoDB:', err)
  })
