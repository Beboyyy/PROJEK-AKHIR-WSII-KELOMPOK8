import React from 'react';
import Main from './pages/Main';
import { Link, NavLink } from 'react-router-dom';
import { Container, Nav, Navbar } from 'react-bootstrap';

class App extends React.Component {
  render() {
    return (
      <div>
        {/* Navbar */}
        <nav className="navbar navbar-expand-lg navbar-light bg-white py-0" bg="dark" variant="dark">
          <div className="container-fluid">
            {/* Navbar Brand */}
            <NavLink className="navbar-brand fs-4" to="/">
              {/* Logo */}
              <img src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/e164c015537247.56293318093f8.jpg" width={205} alt="Logo" />
            </NavLink>

            {/* Navbar Toggler */}
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>

            {/* Navbar Links */}
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                {/* Beranda */}
                <li className="nav-item">
                  <NavLink className="nav-link" to="/">Beranda</NavLink>
                </li>

                {/* Galeri Buku */}
                <li className="nav-item">
                  <NavLink className="nav-link" to="/Buku">Galeri Buku</NavLink>
                </li>

                {/* Pelanggan */}
                <li className="nav-item">
                  <NavLink className="nav-link" to="/pelanggan">Pelanggan</NavLink>
                </li>

                {/* Karyawan */}
                <li className="nav-item">
                  <NavLink className="nav-link" to="/pegawai">Karyawan</NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* Main Component */}
        <p><Main /></p>
      </div>
    );
  }
}

export default App;
