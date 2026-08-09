import { AccessibleContent } from './AccessibleContent'
import { Navbar } from './Navbar'

export function NoWebGLFallback() {
  return (
    <div style={{ minHeight: '100vh', overflowY: 'auto' }}>
      <Navbar />
      <main
        style={{
          maxWidth: 720,
          margin: '0 auto',
          padding: 'calc(64px + var(--space-8)) var(--space-6) var(--space-8)',
          color: 'var(--color-text)',
          lineHeight: 'var(--line-height-body)',
        }}
      >
        <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-6)' }}>
          Your browser or device doesn't support the 3D view. Here's the content in plain text
          instead.
        </p>
        <AccessibleContent />
      </main>
    </div>
  )
}
