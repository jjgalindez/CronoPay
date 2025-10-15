# Componente de Agregar Pagos

Este componente permite a los usuarios agregar nuevos pagos recurrentes a su aplicación CronoPay. Está completamente integrado con Prisma y Supabase para manejo de datos y autenticación.

## 🚀 Configuración después de clonar el repo

### 1. Instalar dependencias
```bash
npm install
```

### 2. Configurar variables de entorno

### 3. Configurar Prisma
```bash
# Generar el cliente de Prisma
npx prisma generate

# Ejecutar migraciones (si las hay)
npx prisma migrate deploy

```

### 4. Insertar datos iniciales
```bash
# Insertar categorías y métodos de pago por defecto
npm run db:seed (Ya estan agregados, no ejecutes de nuevo)
```

### 5. Verificar que todo funcione
```bash
# Ejecutar en modo desarrollo
npm run dev
```

### 📋 Estructura de la base de datos requerida

Las siguientes tablas deben existir en tu base de datos PostgreSQL:

```sql
-- Tabla de categorías
CREATE TABLE categoria (
  id_categoria BIGSERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  descripcion TEXT
);

-- Tabla de métodos de pago
CREATE TABLE metodo_pago (
  id_metodo BIGSERIAL PRIMARY KEY,
  tipo VARCHAR(50) NOT NULL,
  detalles TEXT
);

-- Tabla de pagos
CREATE TABLE pago (
  id_pago BIGSERIAL PRIMARY KEY,
  titulo VARCHAR NOT NULL,
  monto DECIMAL(12,2) NOT NULL,
  fecha_vencimiento DATE NOT NULL,
  estado VARCHAR(20) DEFAULT 'Pendiente',
  id_usuario UUID NOT NULL,
  id_categoria BIGINT REFERENCES categoria(id_categoria),
  id_metodo BIGINT REFERENCES metodo_pago(id_metodo),
  created_at TIMESTAMP(6) DEFAULT now(),
  updated_at TIMESTAMP(6) DEFAULT now()
);

-- Tabla de usuarios (se integra con Supabase Auth)
CREATE TABLE usuarios_perfil (
  id UUID PRIMARY KEY,
  nombre TEXT,
  avatar_url TEXT NOT NULL,
  creado_en TIMESTAMP(6) DEFAULT now(),
  email TEXT UNIQUE DEFAULT ''
);
```

## Componentes Incluidos

### 1. `AddPaymentForm`
El formulario principal para crear nuevos pagos.

**Props:**
- `onSuccess?: () => void` - Callback ejecutado cuando el pago se crea exitosamente
- `onCancel?: () => void` - Callback ejecutado cuando se cancela el formulario

### 2. `AddPaymentModal`
Un modal que envuelve el formulario para una mejor experiencia de usuario.

**Props:**
- `onPaymentAdded?: () => void` - Callback ejecutado cuando se agrega un pago exitosamente

## Uso

### Uso básico del modal:
```tsx
import { AddPaymentModal } from '@/components/payments/add-payment-modal';

function PagosPage() {
  const handlePaymentAdded = () => {
    // Refrescar la lista de pagos o hacer alguna acción
    console.log('Pago agregado exitosamente');
  };

  return (
    <div>
      <AddPaymentModal onPaymentAdded={handlePaymentAdded} />
    </div>
  );
}
```

### Uso directo del formulario:
```tsx
import AddPaymentForm from '@/components/payments/add-payment-form';

function CustomModal() {
  const handleSuccess = () => {
    // Cerrar modal, refrescar datos, etc.
  };

  const handleCancel = () => {
    // Cerrar modal
  };

  return (
    <AddPaymentForm 
      onSuccess={handleSuccess}
      onCancel={handleCancel}
    />
  );
}
```

## Características

- ✅ **Validación completa**: Valida todos los campos requeridos
- ✅ **Estados de carga**: Muestra feedback visual durante las operaciones
- ✅ **Manejo de errores**: Captura y muestra errores de forma amigable
- ✅ **Datos dinámicos**: Carga categorías y métodos de pago desde la base de datos
- ✅ **Diseño responsivo**: Se adapta a diferentes tamaños de pantalla
- ✅ **Autenticación**: Verifica que el usuario esté logueado
- ✅ **Integración con Prisma**: Guarda datos directamente en PostgreSQL

## API Endpoints

El componente utiliza los siguientes endpoints:

- `POST /api/pagos` - Crear nuevo pago
- `GET /api/categorias` - Obtener categorías disponibles
- `GET /api/metodos-pago` - Obtener métodos de pago disponibles

## Base de Datos

### Tablas utilizadas:
- `pago` - Almacena la información del pago
- `categoria` - Categorías de pagos (Entretenimiento, Servicios, etc.)
- `metodo_pago` - Métodos de pago (Tarjeta, PayPal, etc.)
- `usuarios_perfil` - Perfil del usuario (se crea automáticamente si no existe)

### Datos iniciales:
Ejecuta `npm run db:seed` para insertar categorías y métodos de pago por defecto.

## Configuración Requerida

### 🔧 Requisitos previos:
1. **Node.js 18+** instalado
2. **Base de datos PostgreSQL** (local o en la nube)
3. **Cuenta de Supabase** configurada con autenticación

### 🗄️ Configuración de Supabase:
1. Crear proyecto en [Supabase](https://supabase.com)
2. Configurar autenticación con Google OAuth (opcional)
3. Obtener las credenciales del proyecto
4. Configurar Row Level Security (RLS) en las tablas si es necesario

### ⚠️ Troubleshooting común:

**Error: "Cannot find module '@/lib/generated/prisma'"**
```bash
npx prisma generate
```

**Error: "Table 'categoria' doesn't exist"**
```bash
npx prisma db push
npm run db:seed
```

**Error: "BigInt serialization"**
- ✅ Ya resuelto en la API con función `serializePago()`

**Error: "User not authenticated"**
- Verificar que Supabase esté configurado correctamente
- El usuario debe estar logueado antes de usar las APIs

## Personalización

### Estilos:
El componente usa Tailwind CSS y puede personalizarse modificando las clases CSS en:
- `add-payment-form.tsx` - Estilos del formulario
- `add-payment-modal.tsx` - Estilos del modal

### Validaciones:
Las validaciones se pueden modificar en la función `handleSubmit` del formulario.

### Campos adicionales:
Para agregar nuevos campos, modificar:
1. La interfaz `PaymentData`
2. El estado `formData`
3. Agregar el nuevo campo en el JSX
4. Actualizar la API para manejar el nuevo campo