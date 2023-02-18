import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { HashRouter, Route, Routes } from 'react-router-dom';

import { Layout } from './components/layout/layout';
import { store } from './redux/store';

import './index.scss';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <Provider store={store}>
    <HashRouter>
      <Routes>
        <Route path='*' element={<Layout />} />
      </Routes>
    </HashRouter>
  </Provider>
);
