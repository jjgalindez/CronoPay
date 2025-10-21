'use client';

import { Suspense } from 'react';
import PaymentMetricsCard from '@/components/payments/PaymentMetricsCard';
import UpcomingPaymentsCard from '@/components/payments/UpcomingPaymentsCard';
import PaymentCalendarReminders from '@/components/payments/PaymentCalendarReminders';
import { PaymentCalendar } from '@/components/payments/PaymentCalendar';
import AddPaymentForm from '@/components/payments/add-payment-form';
import PaymentListData from '@/components/payments/payment-list-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart3, 
  Calendar, 
  CreditCard, 
  List,
  PlusCircle,
  TrendingUp
} from 'lucide-react';

// Loading components
function MetricsLoading() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {[...Array(4)].map((_, i) => (
        <Card key={i} className="animate-pulse">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="h-4 bg-gray-200 rounded w-24"></div>
            <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
          </CardHeader>
          <CardContent>
            <div className="h-8 bg-gray-200 rounded w-32"></div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function ListLoading() {
  return (
    <div className="space-y-4">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="bg-card rounded-lg border border-border p-6 animate-pulse">
          <div className="flex items-start justify-between">
            <div className="space-y-3 flex-1">
              <div className="h-4 bg-muted rounded w-3/4"></div>
              <div className="h-6 bg-muted rounded w-1/2"></div>
              <div className="flex gap-4">
                <div className="h-4 bg-muted rounded w-20"></div>
                <div className="h-4 bg-muted rounded w-24"></div>
              </div>
            </div>
            <div className="h-6 bg-muted rounded w-20"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function PaymentDashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Panel de Pagos</h1>
          <p className="text-muted-foreground mt-1">
            Gestiona tus pagos, visualiza métricas y mantén el control de tus finanzas
          </p>
        </div>
      </div>

      {/* Metrics Overview */}
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <BarChart3 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          <h2 className="text-xl font-semibold text-foreground">Resumen Financiero</h2>
        </div>
        
        <Suspense fallback={<MetricsLoading />}>
          <PaymentMetricsCard />
        </Suspense>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Vista General
          </TabsTrigger>
          <TabsTrigger value="payments" className="flex items-center gap-2">
            <List className="h-4 w-4" />
            Mis Pagos
          </TabsTrigger>
          <TabsTrigger value="calendar" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Calendario
          </TabsTrigger>
          <TabsTrigger value="add" className="flex items-center gap-2">
            <PlusCircle className="h-4 w-4" />
            Agregar
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <Suspense fallback={<div className="animate-pulse bg-muted rounded-lg h-96"></div>}>
              <UpcomingPaymentsCard />
            </Suspense>
            
            <Suspense fallback={<div className="animate-pulse bg-muted rounded-lg h-96"></div>}>
              <PaymentCalendarReminders />
            </Suspense>
          </div>
        </TabsContent>

        {/* Payments List Tab */}
        <TabsContent value="payments" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Lista de Pagos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<ListLoading />}>
                <PaymentListData />
              </Suspense>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Calendar Tab */}
        <TabsContent value="calendar" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <Suspense fallback={<div className="animate-pulse bg-muted rounded-lg h-96"></div>}>
              <PaymentCalendar />
            </Suspense>
            <Suspense fallback={<div className="animate-pulse bg-muted rounded-lg h-96"></div>}>
              <PaymentCalendarReminders />
            </Suspense>
          </div>
        </TabsContent>

        {/* Add Payment Tab */}
        <TabsContent value="add" className="space-y-6">
          <div className="max-w-2xl mx-auto">
            <AddPaymentForm 
              onSuccess={() => {
                // Optionally switch to payments tab after successful creation
                // You could use router or state management here
              }}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}