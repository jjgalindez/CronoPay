-- Insertar categorías por defecto
INSERT INTO public.categoria (nombre, descripcion) VALUES
  ('Entretenimiento', 'Suscripciones de streaming, juegos, etc.'),
  ('Servicios', 'Internet, teléfono, electricidad, agua, gas'),
  ('Suscripciones', 'Software, aplicaciones, servicios en línea'),
  ('Facturas', 'Facturas médicas, seguros, impuestos'),
  ('Alimentación', 'Supermercado, restaurantes, delivery'),
  ('Transporte', 'Gasolina, mantenimiento del auto, transporte público'),
  ('Salud', 'Medicamentos, consultas médicas, seguros de salud'),
  ('Educación', 'Cursos, libros, materiales educativos'),
  ('Hogar', 'Alquiler, hipoteca, mantenimiento del hogar'),
  ('Otros', 'Gastos varios y misceláneos')
ON CONFLICT (nombre) DO NOTHING;

-- Insertar métodos de pago por defecto
INSERT INTO public.metodo_pago (tipo, detalles) VALUES
  ('Tarjeta de Crédito', 'Pagos con tarjeta de crédito'),
  ('Tarjeta de Débito', 'Pagos con tarjeta de débito'),
  ('Transferencia Bancaria', 'Transferencias desde cuenta bancaria'),
  ('PayPal', 'Pagos a través de PayPal'),
  ('Efectivo', 'Pagos en efectivo'),
  ('Cheque', 'Pagos con cheque'),
  ('Domiciliación Bancaria', 'Débito automático desde cuenta'),
  ('Billetera Digital', 'Aplicaciones de pago móvil'),
  ('Criptomonedas', 'Pagos con monedas digitales'),
  ('Tarjeta Regalo', 'Uso de tarjetas regalo o cupones')
ON CONFLICT (tipo) DO NOTHING;