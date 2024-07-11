import {
    TypedUseSelectorHook,
    useDispatch as useReduxDispatch,
    useSelector as useReduxSelector,
} from "react-redux";
import type { AppDispatch, RootState } from "./store";

type DispatchFunc = () => AppDispatch;
export const useDispatch: DispatchFunc = useReduxDispatch;
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
