import { links } from '@/utils/links';
import axios from 'axios';

export const api = axios.create({
  baseURL: links.api.base,
});
