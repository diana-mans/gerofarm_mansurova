import styles from './App.module.scss';
import axios, { AxiosResponse } from 'axios';
import React from 'react';
import { setItems, setUserTitles, setWidth, setHeight } from './redux/slices/titleSlices';
import { useDispatch, useSelector } from 'react-redux';

function App() {
  const dispatch = useDispatch();
  const { items, userTitles, screenWidth, screenHeight } = useSelector((state) => state.titles);

  const getTitles = (w, h) => {
    const userTitles = items.filter((el, i) => i < w * h);
    dispatch(setUserTitles(userTitles));
  };

  const decreaseWidth = (w) => {
    const n = 300;
    const p = 130;
    for (let i = 1; i <= 6; i++) {
      if (screenHeight <= n + i * p && screenHeight > n + (i - 1) * p) {
        getTitles(w, i);
      }
    }
  };

  const setFullSize = () => {
    dispatch(setWidth(window.innerWidth));
    dispatch(setHeight(window.innerHeight));
  };

  window.addEventListener('resize', setFullSize);

  React.useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/posts').then((res) => {
      const titleArr = [];
      for (let i = 0; i < 48; i++) {
        titleArr.push(res.data[i].title);
      }
      dispatch(setItems(titleArr));
      setFullSize();
    });
  }, []);

  React.useEffect(() => {
    const n = 660;
    const p = 180;
    for (let i = 1; i <= 8; i++) {
      if (screenWidth < n + i * p && screenWidth >= n + (i - 1) * p) {
        decreaseWidth(i);
      }
    }
  }, [screenWidth, screenHeight]);

  return (
    <div className={styles.app}>
      <header className={styles.header}>Header</header>
      <div className={styles.content} style={{ height: screenHeight - 150 + 'px' }}>
        <div className={styles.left_side}>Left side</div>
        <main className={styles.block}>
          {userTitles.map((title, i) => {
            return <div key={i}>{title.length < 15 ? title : title.slice(0, 15) + '...'}</div>;
          })}
        </main>
        <div className={styles.right_side}>Right side</div>
      </div>
      <footer className={styles.footer}>Footer</footer>
    </div>
  );
}

export default App;
