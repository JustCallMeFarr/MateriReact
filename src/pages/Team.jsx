const team = [
  { name: 'Farr', role: 'Project Manager', img: 'https://i.pravatar.cc/200?img=12' },
  { name: 'Nama Anggota 2', role: 'Frontend Developer', img: 'https://i.pravatar.cc/200?img=5' },
  { name: 'Nama Anggota 3', role: 'UI/UX Designer', img: 'https://i.pravatar.cc/200?img=32' },
  { name: 'Nama Anggota 4', role: 'Content Writer', img: 'https://i.pravatar.cc/200?img=47' },
]

function Team() {
  return (
    <>
      <h1 className="text-center mb-2">Tim Kami</h1>
      <p className="text-center text-body-secondary mb-4">
        Orang-orang di balik BookSales.
      </p>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-4">
        {team.map((m) => (
          <div className="col" key={m.name}>
            <div className="card text-center h-100 shadow-sm">
              <img
                src={m.img}
                alt={m.name}
                className="rounded-circle mx-auto mt-4"
                width="120"
                height="120"
              />
              <div className="card-body">
                <h5 className="card-title">{m.name}</h5>
                <p className="card-text text-body-secondary">{m.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default Team