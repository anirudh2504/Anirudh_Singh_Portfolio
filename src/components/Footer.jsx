import { profile } from '../data/profile'
import { useAppearance } from '../hooks/useAppearance'

export default function Footer() {
  const { styleName, theme } = useAppearance()
  return (
    <footer>
      <span>© {new Date().getFullYear()} {profile.name}. Built with React + Vite.</span>
      <span>UI: <code>{styleName}</code> · <code>{theme === 'dark' ? 'Dark' : 'Light'}</code></span>
    </footer>
  )
}
