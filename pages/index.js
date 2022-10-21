import { useEffect } from "react";

export default function Home() {
  // hacky way to redirect to /send
  useEffect(() => {
    window.location.href = "/send";
  }, []);
}
