import { vi } from "vitest";
import type { MiddlewareAPI, Dispatch} from "redux";
import thunkMiddleware from "./thunkMiddleware";

interface MockStore extends MiddlewareAPI<Dispatch<any>, any> {
  dispatch: ReturnType<typeof vi.fn>;
  getState: ReturnType<typeof vi.fn>;
}

const create = () => {
  const store: MockStore = {
    getState: vi.fn(() => ({})),
    dispatch: vi.fn(),
  };

  const next = vi.fn();

  const invoke = (action: any | Function) =>
    thunkMiddleware(store)(next)(action);

  return { store, next, invoke };
};

export default create;
