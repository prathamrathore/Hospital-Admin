import { MdPostAdd, MdMessage } from 'react-icons/md';
import { Link } from 'react-router-dom';

import classes from './MainHeader.module.css';

function MainHeader() {
  return (
    <header className={classes.header}>
      <h1 className={classes.logo}>
        <MdMessage />
        Doctors
      </h1>
      <p>
        <Link to="/create-post" className={classes.button}>
          <MdPostAdd size={18} />
          Add Doctor
        </Link>
      </p>
    </header>
  );
}

export default MainHeader;