import { createContext } from "react";

const AppContext = createContext<[boolean | null, (forceRerender: boolean) => void]>([
    false,
    () => {}
]);

export default AppContext;