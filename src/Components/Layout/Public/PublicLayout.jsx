import { Carousel } from 'antd';
import { useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import styles from './layout.module.css';
import { useIsLoggedIn } from '../../../hooks';

const PublicLayout = () => {
  const isLoggedIn = useIsLoggedIn();

  const [currentSlide, setCurrentSlide] = useState(0);

  const handleCarouselChange = (currentSlider) => {
    setCurrentSlide(currentSlider === 0 ? 1 : 0);
  };
  if (isLoggedIn) {
    return <Navigate to='/dashboard' />;
  }
  return (
    <div
      className={`bg-white ${
        currentSlide === 0 ? styles['black-theme'] : styles['pink-theme']
      }  transition-colors duration-500 animate-fade-in`}
    >
      <div className='container mx-auto p-8 pb-24'>
        <div className='flex flex-col items-center justify-center py-8'>
          <h1 className='text-4xl font-bold mb-4 text-center'>Welcome to Our Student Community</h1>
          <p className='text-lg text-center'>Connect, Share, and Learn with fellow students</p>
        </div>
        <div className='flex flex-col md:flex-row justify-between items-center'>
          <div className='w-full md:w-1/2 md:pr-8'>
            <Carousel autoplay beforeChange={handleCarouselChange}>
              <div>
                <img src='/do-some.jpg' alt='Slider 1' className='w-full rounded-lg' />
              </div>
              <div>
                <img src='/pink-keyboard.jpg' alt='Slider 2' className='w-full rounded-lg' />
              </div>
            </Carousel>
          </div>
          <div className='w-full md:w-1/3'>
            <div
              className={`bg-white ${
                currentSlide === 0 ? styles['custom-shadow-black'] : styles['custom-shadow-pink']
              } rounded-md p-8`}
            >
              <Outlet />
            </div>
          </div>
        </div>
      </div>
      <div className='bg-gray-100 py-8'>
        <div className='text-black container mx-auto'>
          <h2 className='text-3xl text-center font-bold mb-8'>Why Join Our Student Community?</h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            <div className='flex flex-col items-center'>
              <img src='/facebook.png' alt='Logo 1' className='w-16 h-16 mb-4' />
              <h3 className='text-xl font-bold mb-2'>Connect with Peers</h3>
              <p className='text-gray-700 text-center'>
                Connect and network with fellow students in your field of interest.
              </p>
            </div>
            <div className='flex flex-col items-center'>
              <img src='/insta.png' alt='Logo 2' className='w-16 h-16 mb-4' />
              <h3 className='text-xl font-bold mb-2'>Share Your Work</h3>
              <p className='text-gray-700 text-center'>
                Showcase your projects, photos, and videos to gain exposure and feedback.
              </p>
            </div>
            <div className='flex flex-col items-center'>
              <img src='/twitter.png' alt='Logo 3' className='w-16 h-16 mb-4' />
              <h3 className='text-xl font-bold mb-2'>Learn and Grow</h3>
              <p className='text-gray-700 text-center'>
                Learn from educational resources, participate in discussions, and expand your
                knowledge.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className='container mx-auto py-8'>
        <h2 className='text-3xl text-center font-bold mb-4'>Join Our Student Community Today</h2>
        <p className='text-center text-lg mb-6'>
          Sign up now and start connecting with other students!
        </p>
        <div className='flex justify-center'>
          <button className='bg-black hover:bg-pink-500 text-white font-bold py-2 px-4 rounded-full w-48 mx-2'>
            Register
          </button>
        </div>
      </div>
      <div className={styles.scrollIndicator}>
        <span className={styles.scrollArrow}></span>
      </div>
    </div>
  );
};

export default PublicLayout;
