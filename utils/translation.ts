import { TFunction } from 'i18next';

export function translation(t: TFunction<'translation', undefined>, key: string): string {
  return t('safira-app.'.concat(key));
}
