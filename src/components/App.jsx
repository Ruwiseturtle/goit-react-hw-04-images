import Notiflix from 'notiflix';
import { RotatingLines } from 'react-loader-spinner';
import { useState, useEffect } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import getImagesAPI from './services/GalleryAPI';
import css from './App.module.css';

const per_page = 12;

const App = () => {
  const [page, setPage] = useState(1);
  const [gallery, setGallery] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [requestName, setRequestName] = useState('');
  const [showBtnLoadMore, setShowBtnLoadMore] = useState(false);

  //отримуємо параметр запиту з компонента search
  const getFirstRequestParameters = param => {
    if (param !== requestName) {
      setPage(1);
      setGallery([]);
    }
    const newValue = param.toLowerCase().trim();
    setRequestName(newValue);

    if (newValue === '') {
      Notiflix.Notify.info('Please fill out the search bar');      
    };
  }

  //ф-ція до сторінки прибавляє 1 (викликається при натиску на кнопку load more)
  const changePage = e => {
    setPage(page + 1);
  };

  //показати кнопку load more
  const showButton = () => {
    if (showButton !== true) {
      setShowBtnLoadMore(true);
    }
  };

  //сховати кнопку load more
  const hideButton = () => {
    if (showButton !== false) {
      setShowBtnLoadMore(false);
    }
  };
 

  /*******************************************/
  //помилка, яка виникає коли пропадає інтернет
  const errorApi = error => {
    hideButton();
    Notiflix.Notify.info('Something went wrong :( Check your network connection');
    setIsLoading(false);
  };
  // /*******************************************/
 
  //componentDidMount + componentDidUpdate
  useEffect(() => {
    if (requestName === '') {
      return;
    }

    /*******************************************/
    async function getApiData() {
      try {
        setIsLoading(true);
        setShowBtnLoadMore(false);

        await getImagesAPI(requestName, page, per_page)
          .then(result => {
            return result;
          })
          .then(renderData)
          .catch(errorApi);
      } catch (error) {
        console.log('catch');
      }
    }

    /***************************************** */
    //при успішному запиті до бекенду
    const renderData = async data => {
      setIsLoading(false);

      //якщо набрали строку, по якому на бекенді немає картинок
      if (data.data.total === 0) {
        setIsLoading(false);
        Notiflix.Notify.info('There are no images for this request');
      }

      setGallery([...gallery, ...data.data.hits]);

      //якщо картинки закінчились, ховаємо кнопку та лоадер
      if (Math.ceil(per_page * page) >= data.data.totalHits) {
        hideButton();
        setIsLoading(false);
        return;
      }

      showButton();
      setIsLoading(false);
    };

    getApiData();
  }, [requestName, page]);

  /*******************************************/
 
  return (
    <div>
      <Searchbar changeStateAppParam={getFirstRequestParameters}></Searchbar>
      <ImageGallery
        gallery={gallery}
        // changeItems={this.changeItems}
      ></ImageGallery>
      {isLoading && (
        <div className={css.loader}>
          <RotatingLines
            strokeColor="grey"
            strokeWidth="5"
            animationDuration="2.20"
            width="96"
            visible={true}
          />
        </div>
      )}
      {showBtnLoadMore && (
        <Button text="Load more" handleClick={changePage}></Button>
      )}
    </div>
  );
}

//налаштування для Notflix
Notiflix.Notify.init({
  width: '480px',
  position: 'center-center',
  distance: '10px',
  opacity: 1,
  fontSize: '20px',
  clickToClose: true,
  timeout: 3000,
  // ...
});

export default App;
