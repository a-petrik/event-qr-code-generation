import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./css/index.scss";
import CreateEventForm from "./templates/CreateEventForm";

const container = document.getElementById("root") as HTMLElement;

createRoot(container).render(
  <StrictMode>
    <CreateEventForm />
  </StrictMode>,
);
