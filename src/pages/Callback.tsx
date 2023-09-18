import { useEffect } from 'react';
import { parseAuthorizationHash, storeAuthorization } from '../authentication.ts';

export default function Callback() {
  useEffect(() => {
    const authorization = parseAuthorizationHash(window.location.hash);

    if (authorization) {
      storeAuthorization(authorization);
      window.location.href = '/';
    }
  }, []);

  return <>Loading...</>;
}
