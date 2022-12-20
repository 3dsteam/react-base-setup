import {name} from '../../package.json';

export const getLocalStorage = (key: string, isObject = false) => {
    const _local = localStorage.getItem(name + '-' + key);
    if (_local) return isObject ? JSON.parse(_local) : _local;
    return null;
}

export const setLocalStorage = (key: string, value: any, isObject = false) => {
    localStorage.setItem(name + '-' + key, isObject ? JSON.stringify(value) : value);
}

export const removeLocalStorage = (key: string) => {
    localStorage.removeItem(name + '-' + key);
}