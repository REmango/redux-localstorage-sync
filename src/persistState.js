import createSlicer from './createSlicer.js';
import mergeState from './util/mergeState.js';
import debounce from './util/debounce';
/**
 * @description
 * persistState is a Store Enhancer that syncs (a subset of) store state to localStorage.
 *
 * @param {String|String[]} [paths] Specify keys to sync with localStorage, if left undefined the whole store is persisted
 * @param {Object} [config] Optional config object
 * @param {String} [config.namespace="redux"] String used as localStorage key
 * @param {Function} [config.slicer] (paths) => (state) => subset. A function that returns a subset
 * of store state that should be persisted to localStorage
 * @param {Function} [config.serialize=JSON.stringify] (subset) => serializedData. Called just before persisting to
 * localStorage. Should transform the subset into a format that can be stored.
 * @param {Function} [config.deserialize=JSON.parse] (persistedData) => subset. Called directly after retrieving
 * persistedState from localStorage. Should transform the data into the format expected by your application
 *
 * @return {Function} An enhanced store
 */
export default function persistState(paths, config) {
  const cfg = {
    namespace: 'redux-localstorage-sync',
    merge: mergeState,
    slicer: createSlicer,
    serialize: JSON.stringify,
    deserialize: JSON.parse,
    debounceTime: 100,
    syncLocalstorageToRedux: true,
    ...config
  };

  const { namespace, merge, slicer, serialize, deserialize, debounceTime, syncLocalstorageToRedux } = cfg;

  return next => (reducer, initialState, enhancer) => {
    if (typeof initialState === 'function' && typeof enhancer === 'undefined') {
      enhancer = initialState;
      initialState = undefined;
    }

    let persistedState;
    let finalInitialState;

    try {
      persistedState = deserialize(localStorage.getItem(namespace));
      finalInitialState = syncLocalstorageToRedux ? merge(initialState, persistedState, paths) : initialState;
    } catch (e) {
      console.warn('Failed to retrieve initialize state from localStorage:', e);
    }

    const store = next(reducer, finalInitialState, enhancer);
    const slicerFn = slicer(paths);

    const subscribeFn = function() {
      const state = store.getState();
      const subset = slicerFn(state);
      try {
        localStorage.setItem(namespace, serialize(subset));
      } catch (e) {
        console.warn('Unable to persist state to localStorage:', e);
      }
    };
    const targetFn = debounce(subscribeFn, debounceTime);
    store.subscribe(targetFn);

    return store;
  };
}
