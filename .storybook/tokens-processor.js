/**
 * Process a JSON tokens file (deep object) to obtain a documentable friendly list
 *
 * @param {Object} tokens - The original tokens
 *
 * @return {Object[]} Same tokens at root level
 */
const tokensProcessor = (tokens) => {
  const collectedTokens = [];
  const isToken = (obj) => (typeof obj === 'object' && obj.path);
  const processTokensObject = (obj) => {
    Object.values(obj).forEach((value) => {
      if (typeof value !== 'object') return;
      if (isToken(value)) {
        collectedTokens.push(value);
      } else {
        processTokensObject(value);
      }
    });
  };
  processTokensObject(tokens);
  return collectedTokens;
};

export default tokensProcessor;
