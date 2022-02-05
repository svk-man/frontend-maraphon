export class Storage {
  constructor(key) {
    this.key = key;
  }

  get() {
    return localStorage.getItem(this.key);
  }

  set(value) {
    localStorage.setItem(this.key, value);
  }

  clear() {
    localStorage.removeItem(this.key);
  }

  isEmpty() {
    const value = localStorage.getItem(this.key);
    return value === null || value === undefined;
  }
}
