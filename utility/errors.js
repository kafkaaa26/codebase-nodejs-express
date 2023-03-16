class ValidationError extends Error {
  constructor(message, type, data) {
    super(message);

    this.type = type;
    this.data = data;
  }
}

module.exports = {
  ValidationError,
};
