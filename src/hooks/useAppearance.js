import { useContext } from 'react'
import { AppearanceContext } from '../context/appearance-context'
export function useAppearance() {
  const ctx = useContext(AppearanceContext)
  if (!ctx) throw new Error('useAppearance must be used inside <AppearanceProvider>')
  return ctx
}
