import { useState } from "react";

const useGlobalState = () => {
  const [state, setState] = useState({ lat: "", lng: "" });

  const actions = (action) => {
    const { type, payload } = action;
    switch (type) {
      case "setState":
        return setState(payload);
      default:
        break;
    }
  };
  return { state, actions };
};

export default useGlobalState;
