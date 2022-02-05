export class Storage {
  constructor(key, options = { 'storageType': 'localStorage' }) {
    this.key = key;
    this.options = options;
  }

  get() {
    return this.getStorage().getItem(this.key);
  }

  set(value) {
    this.getStorage().setItem(this.key, value);
  }

  clear() {
    this.getStorage().removeItem(this.key);
  }

  isEmpty() {
    const value = this.getStorage().getItem(this.key);
    return value === null || value === undefined;
  }

  getStorage() {
    return window[this.options['storageType']];
  };

  isLocalStorage() {
    return window[this.options['storageType']] === localStorage;
  }

  isSessionStorage() {
    return window[this.options['storageType']] === sessionStorage;
  }
}
