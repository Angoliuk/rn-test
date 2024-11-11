import ar from '@/translations/ar.json';
import en from '@/translations/en.json';

export const resources = {
  ar: {
    translation: ar,
  },
  en: {
    translation: en,
  },
};

export type Language = keyof typeof resources;
