"use client";

import { Suspense } from "react";
import Home from "./Home";

export default function RootHome() {
  return (
    <Suspense>
      <Home />
    </Suspense>
  );
}
