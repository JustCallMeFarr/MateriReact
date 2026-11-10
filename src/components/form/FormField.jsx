import { useState } from 'react'

// Satu kolom isian lengkap: label, input, petunjuk, dan pesan error.
// Dipakai di semua form (login dan registrasi), jadi tampilan dan aksesibilitasnya seragam.
// Kalau type="password", otomatis ada tombol Lihat/Sembunyi.
function FormField({
  id,
  label,
  type = 'text',
  error,
  hint,
  children, // konten tambahan di bawah input, mis. indikator kekuatan password
  ...inputProps // name, value, onChange, onBlur, placeholder, autoComplete, dll
}) {
  const [visible, setVisible] = useState(false)
  const isPassword = type === 'password'
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined

  const input = (
    <input
      id={id}
      type={isPassword && visible ? 'text' : type}
      className={`form-control form-control-lg ${error ? 'is-invalid' : ''}`}
      aria-invalid={error ? 'true' : 'false'}
      aria-describedby={describedBy}
      {...inputProps}
    />
  )

  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label fw-semibold">{label}</label>

      {isPassword ? (
        <div className="input-group has-validation">
          {input}
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={() => setVisible((v) => !v)}
            aria-label={visible ? 'Sembunyikan password' : 'Tampilkan password'}
            aria-pressed={visible}
          >
            {visible ? 'Sembunyi' : 'Lihat'}
          </button>
        </div>
      ) : (
        input
      )}

      {error ? (
        <div id={`${id}-error`} className="invalid-feedback d-block" role="alert">
          {error}
        </div>
      ) : (
        hint && <div id={`${id}-hint`} className="form-text">{hint}</div>
      )}

      {children}
    </div>
  )
}

export default FormField
