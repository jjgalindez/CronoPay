import React from 'react'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { PrismaClient } from '@/lib/generated/prisma'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, Mail, User, CheckCircle2, XCircle } from 'lucide-react'

const prisma = new PrismaClient()

interface PageProps {
  params: Promise<{ id: string }>
}

async function getUserPublicInfo(userId: string) {
  try {
    const user = await prisma.usuarios_perfil.findUnique({
      where: { id: userId },
      select: {
        id: true,
        nombre: true,
        avatar_url: true,
        email: true,
        creado_en: true,
        pago: {
          select: {
            id_pago: true,
            titulo: true,
            monto: true,
            estado: true,
            fecha_vencimiento: true,
          },
          orderBy: {
            fecha_vencimiento: 'desc'
          },
          take: 5 // Solo mostrar últimos 5 pagos
        }
      }
    })

    return user
  } catch (error) {
    console.error('Error fetching user:', error)
    return null
  }
}

function formatDate(date: Date | null) {
  if (!date) return 'N/A'
  return new Date(date).toLocaleDateString('es-CO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

export default async function UserProfilePage({ params }: PageProps) {
  const { id } = await params
  const user = await getUserPublicInfo(id)

  if (!user) {
    notFound()
  }

  const isGoogleAvatar = user.avatar_url?.includes('googleusercontent.com')

  // Calcular estadísticas públicas
  const totalPagos = user.pago.length
  const pagosPagados = user.pago.filter((p) => p.estado === 'Pagado').length
  const pagosPendientes = user.pago.filter((p) => p.estado === 'Pendiente').length

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header con avatar y info básica */}
        <div className="mb-8">
          <Card className="overflow-hidden">
            <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600"></div>
            <CardContent className="relative pt-20 pb-8">
              {/* Avatar */}
              <div className="absolute -top-16 left-8">
                <div className="relative w-32 h-32 rounded-full border-4 border-white dark:border-gray-800 overflow-hidden bg-gray-200">
                  {user.avatar_url ? (
                    <Image
                      src={user.avatar_url}
                      alt={user.nombre || 'Usuario'}
                      fill
                      className="object-cover"
                      unoptimized={isGoogleAvatar}
                      referrerPolicy={isGoogleAvatar ? 'no-referrer' : undefined}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
                      <User className="w-16 h-16 text-white" />
                    </div>
                  )}
                </div>
              </div>

              {/* Info del usuario */}
              <div className="ml-44">
                <h1 className="text-3xl font-bold mb-2">{user.nombre || 'Usuario'}</h1>
                
                <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    <span>{user.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>Miembro desde {formatDate(user.creado_en)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Total de Pagos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{totalPagos}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Pagos Completados
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <div className="text-3xl font-bold text-green-600">{pagosPagados}</div>
                <CheckCircle2 className="w-6 h-6 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Pagos Pendientes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <div className="text-3xl font-bold text-orange-600">{pagosPendientes}</div>
                <XCircle className="w-6 h-6 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actividad reciente */}
        <Card>
          <CardHeader>
            <CardTitle>Actividad Reciente</CardTitle>
          </CardHeader>
          <CardContent>
            {user.pago.length === 0 ? (
              <p className="text-center text-gray-500 py-8">
                Este usuario no tiene pagos registrados
              </p>
            ) : (
              <div className="space-y-4">
                {user.pago.map((pago) => (
                  <div
                    key={pago.id_pago}
                    className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <div className="flex-1">
                      <h3 className="font-semibold">{pago.titulo}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Vencimiento: {formatDate(pago.fecha_vencimiento)}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-bold text-lg">
                        ${Number(pago.monto).toLocaleString('es-CO')}
                      </span>
                      <Badge
                        variant={pago.estado === 'Pagado' ? 'default' : 'secondary'}
                        className={
                          pago.estado === 'Pagado'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100'
                            : 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100'
                        }
                      >
                        {pago.estado}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}