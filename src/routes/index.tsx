import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return <div className="min-h-screen" style={{ backgroundColor: "#ffc0cb" }} />;
}
