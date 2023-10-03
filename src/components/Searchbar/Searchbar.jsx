import { useState } from 'react';
import css from './Searchbar.module.css';
import IconButton from '../IconButton/IconButton';
import { ReactComponent as Icon } from '../../icons/searchIcon.svg';

// приймає тільки один проп onSubmit
const Searchbar = ({ changeStateAppParam}) => {
  const [name, setName] = useState('');
  

  const handleNameChange = event => {
    setName(event.currentTarget.value.toLowerCase())    
  };

 const handleSearch = e => {
    e.preventDefault();
    changeStateAppParam(name);
  };

    return (
      <header className={css.searchbar}>
        <form className={css.form} onSubmit={handleSearch}>
          <IconButton>
            <Icon width="40" height="40"/>
          </IconButton>

          <input
            className={css.input}
            type="text"
            name="name"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={handleNameChange}
            value={name}
          />
        </form>
      </header>
    );
  }


export default Searchbar;
