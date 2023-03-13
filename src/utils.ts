export const checkJwtLocalStorage = () => {
    const value = localStorage.getItem('jwt');

    if (value) {
        return true;
    }

    return false;
}

export const setNewJwtLocalStorage = (key: string) => {
    localStorage.setItem('jwt', key);
}
