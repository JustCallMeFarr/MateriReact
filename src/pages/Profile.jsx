import { Link } from 'react-router-dom'
import useAuth from '../context/useAuth'
import { ACCESS_RULES } from '../services/authorizationService'

// Halaman profil: bisa dibuka semua user yang sudah login (admin maupun user biasa).
// Isinya data akun dan tabel hak akses sesuai role.
function Profile() {
  const { user, isAdmin, can } = useAuth()

  const details = [
    { label: 'Nama lengkap', value: user.name },
    { label: 'Username', value: user.username },
    { label: 'Email', value: user.email },
  ]

  return (
    <>
      <h1 className="mb-4">Profil Saya</h1>

      <div className="row g-4">
        <div className="col-lg-5">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-body">
              <div className="d-flex align-items-center gap-3 mb-4">
                <div
                  className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center fs-3 fw-bold flex-shrink-0"
                  style={{ width: 64, height: 64 }}
                  aria-hidden="true"
                >
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <div className="h5 mb-1 text-break">{user.name}</div>
                  <span className={`badge text-bg-${isAdmin ? 'danger' : 'secondary'}`}>
                    {isAdmin ? 'Admin' : 'User'}
                  </span>
                </div>
              </div>

              <dl className="mb-0">
                {details.map((d) => (
                  <div key={d.label} className="mb-3">
                    <dt className="small text-body-secondary fw-normal">{d.label}</dt>
                    <dd className="mb-0 text-break">{d.value}</dd>
                  </div>
                ))}
              </dl>

              {isAdmin && (
                <Link to="/admin" className="btn btn-primary w-100 mt-2">
                  Buka Dashboard Admin
                </Link>
              )}
            </div>
          </div>
        </div>

        <div className="col-lg-7">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-header bg-body fw-semibold">Hak akses akunmu</div>
            <div className="table-responsive">
              <table className="table align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th scope="col">Halaman</th>
                    <th scope="col">Syarat</th>
                    <th scope="col" className="text-end">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {ACCESS_RULES.map((rule) => {
                    const allowed = can(rule.roles)
                    return (
                      <tr key={rule.path}>
                        <td>
                          <div className="fw-semibold">{rule.label}</div>
                          <code className="small">{rule.path}</code>
                        </td>
                        <td className="text-body-secondary">{rule.note}</td>
                        <td className="text-end">
                          <span className={`badge text-bg-${allowed ? 'success' : 'secondary'}`}>
                            {allowed ? 'Boleh' : 'Tidak boleh'}
                          </span>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile
