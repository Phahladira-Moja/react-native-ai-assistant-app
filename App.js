import AppNavigation from "./navigation";
import { useEffect } from "react";
import { apiCall } from "./api/openAI";

export default function App() {
  useEffect(() => {
    // apiCall("create an image of a dog");
  }, []);

  return <AppNavigation />;
}
