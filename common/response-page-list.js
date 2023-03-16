module.exports = class ResponsePageList {
  constructor(status, message, data, page, size, total) {
    this.status = status;
    this.message = message;
    this.data = data;
    this.page = page;
    this.size = size;
    this.total = total;
  }
};
