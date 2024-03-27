import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import {
  Login,
  Home
} from "@/pages";
import { LoadingScreen } from "@/components";
import { IsValid, Loading } from "@/containers";
import { useAuth } from "@/hooks";

export function Router() {
  const { isValid, isInValidation } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
      {isInValidation && (
        <Route path="/*" element={<LoadingScreen />} />
      )}
      {!isValid && !isInValidation && (
        <Route path="/" element={<Loading />} >
          <Route path="/" element={<Login />} />
          <Route path="/*" element={<Navigate to="/" replace />} />
        </Route>
      )}
      {isValid && !isInValidation && (
        <Route path="/" element={<Loading />} >
          <Route path="/" element={<IsValid />} >
            <Route path="/" element={<Home />} />
            <Route path="/*" element={<Navigate to="/" replace />} />
          </Route>
        </Route>
      )}
      </Routes>
    </BrowserRouter>
  );
}
