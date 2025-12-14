-- CreateTable
CREATE TABLE "alumnos" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,
    "apellido" VARCHAR(100) NOT NULL,
    "grado" VARCHAR(50) NOT NULL,
    "seccion" VARCHAR(10) NOT NULL,
    "fecha_nacimiento" DATE,
    "creado_en" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "alumnos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "asistencia" (
    "id" SERIAL NOT NULL,
    "alumno_id" INTEGER,
    "curso_id" INTEGER,
    "fecha" DATE NOT NULL,
    "presente" BOOLEAN NOT NULL,
    "justificado" BOOLEAN DEFAULT false,

    CONSTRAINT "asistencia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cursos" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,
    "grado" VARCHAR(50) NOT NULL,
    "seccion" VARCHAR(10) NOT NULL,
    "profesor_id" INTEGER,

    CONSTRAINT "cursos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notas" (
    "id" SERIAL NOT NULL,
    "alumno_id" INTEGER,
    "curso_id" INTEGER,
    "nota" DECIMAL(5,2),
    "tipo" VARCHAR(50),
    "fecha" DATE DEFAULT CURRENT_DATE,

    CONSTRAINT "notas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usuarios" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,
    "apellido" VARCHAR(100) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "rol" VARCHAR(20) NOT NULL,
    "creado_en" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");

-- AddForeignKey
ALTER TABLE "asistencia" ADD CONSTRAINT "asistencia_alumno_id_fkey" FOREIGN KEY ("alumno_id") REFERENCES "alumnos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "asistencia" ADD CONSTRAINT "asistencia_curso_id_fkey" FOREIGN KEY ("curso_id") REFERENCES "cursos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "cursos" ADD CONSTRAINT "cursos_profesor_id_fkey" FOREIGN KEY ("profesor_id") REFERENCES "usuarios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "notas" ADD CONSTRAINT "notas_alumno_id_fkey" FOREIGN KEY ("alumno_id") REFERENCES "alumnos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "notas" ADD CONSTRAINT "notas_curso_id_fkey" FOREIGN KEY ("curso_id") REFERENCES "cursos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
