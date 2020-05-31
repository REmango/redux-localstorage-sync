import { getPropertyByPath, setPropertyByPath } from './syncPropertyByPath'


export default function mergeState(initialState, persistedState, paths) {

  let result = initialState;
  if(persistedState) {
    if(Array.isArray(paths) && paths.length > 0) {
        paths.forEach((path) => {
            const pathArr = path.split('.');
            const value = getPropertyByPath(persistedState, pathArr);
            if (value) {
                setPropertyByPath(initialState, pathArr, value)
            }
        })
    } else {
        result = {...initialState, ...persistedState}
    }
  }

  return result
}