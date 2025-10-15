import { PrismaClient } from '@/lib/generated/prisma';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed de la base de datos...');

  // Insertar categorías
  const categorias = [
    { nombre: 'Entretenimiento', descripcion: 'Suscripciones de streaming, juegos, etc.' },
    { nombre: 'Servicios', descripcion: 'Internet, teléfono, electricidad, agua, gas' },
    { nombre: 'Suscripciones', descripcion: 'Software, aplicaciones, servicios en línea' },
    { nombre: 'Facturas', descripcion: 'Facturas médicas, seguros, impuestos' },
    { nombre: 'Alimentación', descripcion: 'Supermercado, restaurantes, delivery' },
    { nombre: 'Transporte', descripcion: 'Gasolina, mantenimiento del auto, transporte público' },
    { nombre: 'Salud', descripcion: 'Medicamentos, consultas médicas, seguros de salud' },
    { nombre: 'Educación', descripcion: 'Cursos, libros, materiales educativos' },
    { nombre: 'Hogar', descripcion: 'Alquiler, hipoteca, mantenimiento del hogar' },
    { nombre: 'Otros', descripcion: 'Gastos varios y misceláneos' },
  ];

  console.log('📊 Insertando categorías...');
  for (const categoria of categorias) {
    try {
      await prisma.categoria.create({
        data: categoria,
      });
    } catch (error) {
      // Ignora errores de duplicados
      console.log(`Categoría '${categoria.nombre}' ya existe`);
    }
  }

  // Insertar métodos de pago
  const metodosPago = [
    { tipo: 'Tarjeta de Crédito', detalles: 'Pagos con tarjeta de crédito' },
    { tipo: 'Tarjeta de Débito', detalles: 'Pagos con tarjeta de débito' },
    { tipo: 'Transferencia Bancaria', detalles: 'Transferencias desde cuenta bancaria' },
    { tipo: 'PayPal', detalles: 'Pagos a través de PayPal' },
    { tipo: 'Efectivo', detalles: 'Pagos en efectivo' },
    { tipo: 'Cheque', detalles: 'Pagos con cheque' },
    { tipo: 'Domiciliación Bancaria', detalles: 'Débito automático desde cuenta' },
    { tipo: 'Billetera Digital', detalles: 'Aplicaciones de pago móvil' },
    { tipo: 'Criptomonedas', detalles: 'Pagos con monedas digitales' },
    { tipo: 'Tarjeta Regalo', detalles: 'Uso de tarjetas regalo o cupones' },
  ];

  console.log('💳 Insertando métodos de pago...');
  for (const metodo of metodosPago) {
    try {
      await prisma.metodo_pago.create({
        data: metodo,
      });
    } catch (error) {
      // Ignora errores de duplicados
      console.log(`Método de pago '${metodo.tipo}' ya existe`);
    }
  }

  console.log('✅ Seed completado exitosamente!');
}

main()
  .catch((e) => {
    console.error('❌ Error en el seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });