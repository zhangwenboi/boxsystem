
import { Routes, Route, useNavigate } from 'react-router-dom';
import Layout from './view/layout';
// import Login from './view/login';

import NotFound from './view/notFound';

import { ReactNode, Suspense, useEffect, useState } from 'react';
import Home from './view/home';



function Redirect({ to }: { to: string }) {
  let navigate = useNavigate();
  useEffect(() => {
    navigate(to);
  });
  return null;
}
const lazyLoad = (children: ReactNode): ReactNode => {
  return (
    <Suspense >
      {children}
    </Suspense>
  )
}


function App() {
  useEffect(() => {
    document.querySelector('#index-loading')?.remove()
  }, [])
  return (
    <Routes>
      <Route path="/" element={<Layout />} >
        <Route path="NotFound" element={<NotFound />} />
        <Route index element={lazyLoad(<Home />)} />

        <Route path="*" element={<Redirect to='NotFound' />} />
      </Route>
      {/* <Route path="/login" element={<Login />} /> */}
    </Routes>
  );
}

export default App
