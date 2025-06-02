import { NavLink } from 'react-router-dom';

export function Header() {
  return (
    <header className="tambo-header">
      <div className="header-content">
        <h1>TAMBO - Gestión de Inventario</h1>
        <nav>
          <ul>
            <li>
              <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>
                Inventario
              </NavLink>
            </li>
            <li>
              <NavLink to="/reports" className={({ isActive }) => (isActive ? 'active' : '')}>
                Reportes
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
