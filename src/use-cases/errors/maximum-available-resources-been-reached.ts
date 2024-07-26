export class MaximumAvailableResourcesBeenReached extends Error {
  constructor() {
    super("Maximum number of available resources has been reached.");
  }
}
