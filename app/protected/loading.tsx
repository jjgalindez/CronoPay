import { LoadingSpinner } from '@/components/ui/loading-spinner'
import React from 'react'

export default function loading() {
  return (
    <LoadingSpinner message="Cargando..." size="lg" variant="blur"/>
  )
}
