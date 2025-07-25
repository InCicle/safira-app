import { links } from '@/utils/links';
import { api } from '@/services/api';

export async function getViewedTutorialsData() {
  return await api.get(`${links.api.core}/tutorials`);
}

export async function modifyViewedTutorialsData(moduleName: string) {
  await api.put(`${links.api.core}/tutorials/${moduleName}/viewed`);
}
