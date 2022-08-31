import React from 'react';
import { ThreeDots } from 'react-loader-spinner';
import s from './Loader.module.css'

const Loader = () => {
  return (
    <div className={s.container}>
      <ThreeDots
        height="80"
        width="80"
        radius="9"
        color="#4fa94d"
        ariaLabel="three-dots-loading"
        // wrapperStyle={{}}
        // wrapperClassName=""
        visible={true}
      />
    </div>
  );
};

export default Loader;
