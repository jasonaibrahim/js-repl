import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

export const ReplContext = createContext<{
  evaluationResult: string;
  setEvaluationResult: Dispatch<SetStateAction<string>>;
}>({ evaluationResult: "", setEvaluationResult: () => null });

export const ReplContextProvider = ({ children }: { children: ReactNode }) => {
  const [evaluationResult, setEvaluationResult] = useState("");
  return (
    <ReplContext.Provider value={{ evaluationResult, setEvaluationResult }}>
      {children}
    </ReplContext.Provider>
  );
};
