import { ProstorDemo } from "./ProstorDemo";

export default function ProstorDemoPage() {
  return <ProstorDemo allowedModules={["emotions", "needs", "values", "identity"]} />;
}
