import { RouterProvider } from 'react-router-dom';
import './App.css';
import { router } from './Routes/Routes';
import { Toaster } from 'react-hot-toast';

function App() {
  // document.addEventListener('contextmenu', function (event) {
  //   event.preventDefault();
  // });
  return (
    <div className='bg-white'>
      <RouterProvider router={router}>

      </RouterProvider>
      <Toaster />
    </div>
  );
}

export default App;
