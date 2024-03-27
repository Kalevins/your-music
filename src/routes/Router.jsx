import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import {
  Login,
  Home,
  Details
} from "@/pages";
import { LoadingScreen } from "@/components";
import { Menus, Loading } from "@/containers";
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
          <Route path="/" element={<Menus />} >
            <Route path="/" element={<Home />} />
          </Route>
          <Route path="/*" element={<Navigate to="/" replace />} />
          <Route path="/details/:id" element={<Details />} />
        </Route>
      )}
      </Routes>
    </BrowserRouter>
  );
}
