export const STORAGE_TYPES = {
  LOCAL: 'localStorage',
  SESSION: 'sessionStorage'
}

const OPTIONS_PROPERTIES = {
  storageType: 'storageType',
  defaultValue: 'defaultValue',
}

export class Storage {
  constructor(key, options = {
    [OPTIONS_PROPERTIES.storageType]: STORAGE_TYPES.LOCAL,
    [OPTIONS_PROPERTIES.defaultValue]: null
  }) {
    this.key = key;

    this.options = options;

    const isValidStorageType = options[OPTIONS_PROPERTIES.storageType] === STORAGE_TYPES.LOCAL
      || options[OPTIONS_PROPERTIES.storageType] === STORAGE_TYPES.SESSION;
    if (!isValidStorageType) {
      this.options[OPTIONS_PROPERTIES.storageType] = STORAGE_TYPES.LOCAL;
    }

    const isValidDefaultValue = options[OPTIONS_PROPERTIES.defaultValue] !== null;
    if (isValidDefaultValue) {
      this.set(options[OPTIONS_PROPERTIES.defaultValue]);
    }
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
    return window[this.options[OPTIONS_PROPERTIES.storageType]];
  }

  isLocalStorage() {
    return this.getStorage() === localStorage;
  }

  isSessionStorage() {
    return this.getStorage() === sessionStorage;
  }
}
