import { ReactNode } from 'react';
import { I18nProviderClient } from '@/utils/localization/client';

interface Props {
  children: ReactNode;
  params: {
    locale: string;
  };
}

export default function RootLayout({ children, params: { locale } }: Props) {
  return <I18nProviderClient locale={locale}>{children}</I18nProviderClient>;
}
