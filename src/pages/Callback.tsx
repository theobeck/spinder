import { useEffect } from 'react';
import { parseAuthorizationHash, storeAuthorization } from '../utils/authentication.ts';
import {useNavigate} from "react-router-dom";

export default function Callback() {
  const navigate = useNavigate();
  useEffect(() => {
    const authorization = parseAuthorizationHash(window.location.hash);

    if (authorization) {
      storeAuthorization(authorization);
      navigate("/");
      window.location.reload();
    }
  }, [navigate]);

  return <>Loading...</>;
}
