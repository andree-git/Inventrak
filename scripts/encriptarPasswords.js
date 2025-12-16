const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  const usuarios = await prisma.usuarios.findMany();

  for (const usuario of usuarios) {
    // Evitar volver a encriptar
    if (!usuario.password.startsWith("$2")) {
      const hash = await bcrypt.hash(usuario.password, 10);

      await prisma.usuarios.update({
        where: { id: usuario.id },
        data: { password: hash },
      });

      console.log(`Password encriptado para ${usuario.email}`);
    }
  }

  console.log("✔️ Todas las contraseñas están seguras");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
