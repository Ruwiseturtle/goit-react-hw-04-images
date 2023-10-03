
import css from './Button.module.css';

const Button = ({handleClick,  text }) => {
 const onClick = e => {
    e.preventDefault();
    handleClick();
  };
  return (
    <div>
      {
        <button          
          className={css.button}
          type="button"
          onClick={onClick}
        >
          <span>{text}</span>
        </button>
      }
    </div>
  );
};


export default Button;
