import { ProstorDemo } from "./prostor-demo/ProstorDemo";

export default function Home() {
  return <ProstorDemo allowedModules={["emotions", "needs", "values", "identity"]} />;
}
