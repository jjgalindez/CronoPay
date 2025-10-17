#  Configuración Rápida de Prisma y API - CronoPay

## Pasos después de clonar el repo

### 1. Instalar dependencias
```bash
npm install
```

### 2. Variables de entorno (.env.local)
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON_KEY=tu_anon_key
# Prisma
```

### 3. Configuración de Prisma
```bash
# Generar cliente de Prisma
npx prisma generate

# Aplicar schema a la base de datos
npx prisma db push

# Insertar datos iniciales (categorías y métodos de pago)
npm run db:seed
```

### 4. Verificar configuración
```bash
# Ejecutar aplicación
npm run dev

# Ir a http://localhost:3000/protected/payments
```

## 🔍 Verificación de APIs

### Endpoints disponibles:

**Pagos:**
- `GET /api/pagos` - Listar pagos del usuario
- `POST /api/pagos` - Crear nuevo pago

**Categorías:**
- `GET /api/categorias` - Listar categorías
- `POST /api/categorias` - Crear nueva categoría

**Métodos de pago:**
- `GET /api/metodos-pago` - Listar métodos
- `POST /api/metodos-pago` - Crear nuevo método

### Estructura de datos que maneja la API:

**Crear pago (POST /api/pagos):**
```json
{
  "titulo": "Netflix",
  "monto": 15.99,
  "fecha_vencimiento": "2025-10-30",
  "id_categoria": "1",
  "id_metodo": "1"
}
```

**Respuesta típica:**
```json
{
  "message": "Pago creado exitosamente",
  "pago": {
    "id_pago": "1",
    "titulo": "Netflix",
    "monto": "15.99",
    "fecha_vencimiento": "2025-10-30T00:00:00.000Z",
    "estado": "Pendiente",
    "categoria": {
      "id_categoria": "1",
      "nombre": "Entretenimiento"
    },
    "metodo_pago": {
      "id_metodo": "1",
      "tipo": "Tarjeta de Crédito"
    }
  }
}
```

## 🐛 Solución de problemas comunes

### Error: "Cannot connect to database"
```bash
# Verificar que PostgreSQL esté corriendo
# Verificar las credenciales en .env.local
# Probar conexión:
npx prisma db pull
```

### Error: "Table does not exist"
```bash
# Recrear la base de datos:
npx prisma db push --force-reset
npm run db:seed
```

### Error: "Prisma client not generated"
```bash
npx prisma generate
```

### Error: "BigInt serialization"
✅ **Ya resuelto** - La API incluye la función `serializePago()` que convierte BigInt a string automáticamente.

## 📊 Datos de prueba

Después de ejecutar `npm run db:seed`, tendrás:

**Categorías disponibles:**
- Entretenimiento, Servicios, Suscripciones, Facturas, Alimentación, Transporte, Salud, Educación, Hogar, Otros

**Métodos de pago disponibles:**
- Tarjeta de Crédito, Tarjeta de Débito, Transferencia Bancaria, PayPal, Efectivo, Cheque, Domiciliación Bancaria, Billetera Digital, Criptomonedas, Tarjeta Regalo

## 🎯 Prueba rápida

1. Ve a `/payments`
2. Haz clic en "Agregar Pago"
3. Llena el formulario:
   - Título: "Netflix"
   - Monto: 15.99
   - Fecha: 2025-10-30
   - Categoría: Entretenimiento
   - Método: Tarjeta de Crédito
4. Guarda y verifica que aparezca en la lista

¡Listo!