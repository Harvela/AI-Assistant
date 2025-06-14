'use client';

import type { PropsWithChildren } from 'react';
import { useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';

import i18n from '../i18n/config';

export default function I18nProvider({ children }: PropsWithChildren) {
  useEffect(() => {
    // Initialize i18n
    i18n.init();
  }, []);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
