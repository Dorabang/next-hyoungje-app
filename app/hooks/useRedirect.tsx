'use client';
import React from 'react';
import getUser from './useAuthStateChanged';
import ErrorPage from '../404/page';
import { redirect } from 'next/navigation';

const useRedirect = () => {
  const user = getUser();

  if (!user) redirect('/error');
};

export default useRedirect;
