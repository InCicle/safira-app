import axios from 'axios';
import { links } from '../config/links';
import { VerifyTokenData } from '../contexts/AuthContext';

export async function validateToken(verifyTokenData: VerifyTokenData): Promise<boolean> {
  try {
    const response = await axios.post(`${links.api.core}/account/verify`, {
      email: verifyTokenData.email,
      token: verifyTokenData.token,
    });

    if (response.status === 200 && !response.data.errors) {
      return true;
    }

    return false;
  } catch {
    return false;
  }
}
