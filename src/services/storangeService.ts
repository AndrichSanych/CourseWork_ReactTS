
const accessKey = process.env.REACT_APP_ACCESS_KEY || '';
const favouritesKey = process.env.REACT_APP_FAVORITES_KEY || '';
const isSessionStorage = () => sessionStorage.getItem(accessKey) !== null;

export const storageService = {
    saveTokens: (accessToken: string) => {
        if (isSessionStorage()) {
            sessionStorage.setItem(accessKey, accessToken);
            localStorage.removeItem(accessKey);
        }
        else {
            localStorage.setItem(accessKey, accessToken);
            sessionStorage.removeItem(accessKey);
        }
    },

    getAccessToken: () => sessionStorage.getItem(accessKey) || localStorage.getItem(accessKey),

    setTemporalyTokens: (accessToken: string) => sessionStorage.setItem(accessKey, accessToken),

    removeTokens: () => {
        localStorage.removeItem(accessKey);
        sessionStorage.removeItem(accessKey);
    },

    isLocalFavorites: (): boolean => localStorage.getItem(favouritesKey) ? true : false,

    getLocalFavorites: (): number[] => {
        const fav = localStorage.getItem(favouritesKey);
        return fav ? JSON.parse(fav) : []
    },

    setLocalFavorites: (ids: number[]) => localStorage.setItem(favouritesKey, JSON.stringify(ids)),

    toggleFavorites: (id: number) => {
        let ids: number[] = [];
        if (storageService.isLocalFavorites()) {
            ids = storageService.getLocalFavorites();
            if(ids.includes(id)){
                storageService.setLocalFavorites(ids.filter(x => x !== id));
                return
            }
        }
        ids.push(id)
        storageService.setLocalFavorites(ids);
    },

    // removeFromLocalFavorites: (id: number) => {
    //     if (storageService.isLocalFavorites()) {
    //         const ids: number[] = storageService.getLocalFavorites();
            
    //         console.log(ids.filter(x => x !== id))
    //     }
    // }
}