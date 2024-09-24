import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { RecoilRoot } from 'recoil';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </React.StrictMode>
);
//index.js:16 Uncaught Error: This component must be used inside a <RecoilRoot> component.
// <RecoilRoot> 로 <App>을 감싸지 않았을때 발생하는 에러이다.
