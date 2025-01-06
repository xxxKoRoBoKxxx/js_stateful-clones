'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const workingObject = Object.assign({}, state);
  const stateHistory = [];

  for (const action of actions) {
    actionPerform(action);
  }

  function actionPerform({ type, extraData, keysToRemove } = {}) {
    if (type === 'addProperties') {
      for (const [key, value] of Object.entries(extraData)) {
        workingObject[key] = value;
      }
    }

    if (type === 'removeProperties') {
      for (const key of keysToRemove) {
        delete workingObject[key];
      }
    }

    if (type === 'clear') {
      for (const key of Object.keys(workingObject)) {
        delete workingObject[key];
      }
    }

    stateHistory.push(Object.assign({}, workingObject));
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
