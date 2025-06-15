// hash.ts (crea este archivo en backend)
import bcrypt from 'bcryptjs'

const main = async () => {
  const password = '123456' // La contraseña que quieras
  const hashed = await bcrypt.hash(password, 10)
  console.log('Contraseña hasheada:', hashed)
}

main()
