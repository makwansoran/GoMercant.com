import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { config } from 'dotenv'

config()

const prisma = new PrismaClient()

async function main() {
  const adminEmail = 'admin@admin.com'
  const adminPassword = 'admin123'
  
  // Check if admin already exists
  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail }
  })

  if (existingAdmin) {
    console.log('Admin account already exists')
    return
  }

  // Create admin account
  const hashedPassword = await bcrypt.hash(adminPassword, 10)
  
  const admin = await prisma.user.create({
    data: {
      name: 'Admin User',
      email: adminEmail,
      password: hashedPassword,
      role: 'admin',
    }
  })

  console.log('Admin account created:', admin.email)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
