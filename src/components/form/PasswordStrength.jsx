import { passwordStrength } from '../../Utils/validators'

const LEVELS = [
  { label: '', color: 'secondary' },
  { label: 'Lemah', color: 'danger' },
  { label: 'Cukup', color: 'warning' },
  { label: 'Kuat', color: 'info' },
  { label: 'Sangat kuat', color: 'success' },
]

// Batang 4 segmen yang terisi sesuai kekuatan password.
function PasswordStrength({ password }) {
  if (!password) return null
  const score = passwordStrength(password)
  const { label, color } = LEVELS[score]

  return (
    <div className="mt-2" aria-live="polite">
      <div className="d-flex gap-1">
        {[1, 2, 3, 4].map((step) => (
          <div
            key={step}
            className={`flex-fill rounded-pill bg-${step <= score ? color : 'secondary-subtle'}`}
            style={{ height: 6 }}
          />
        ))}
      </div>
      <div className={`small mt-1 text-${color}`}>Kekuatan password: {label}</div>
    </div>
  )
}

export default PasswordStrength
