import { Link } from 'react-router-dom';

function Header() {
  return (
    <>
      <header>
        <h1>React Demo</h1>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/guess">Zgadnij liczbę</Link></li>
            <li><Link to="/tasks">Lista zadań</Link></li>
          </ul>
        </nav>
      </header>
    </>
  );
}

export default Header;