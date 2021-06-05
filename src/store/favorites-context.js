import { createContext, useState } from "react";

export const FavoritesContext = createContext({
  favorites: [],
  totalFavorites: 0,
  addFavorite: (favoriteMeetup) => {}, // 只是更方便 IDE 辨別，可以不用加
  removeFavorite: (meetupId) => {},
  itemIsFavorite: (meetupId) => {}
});

export function FavoritesContextProvider(props) {
    const [userFavorites, setUserFavorites] = useState([])

    const context = {
        favorites: userFavorites,
        totalFavorites: userFavorites.length,
        addFavorite: addFavoriteHandler,
        removeFavorite: removeFavoriteHandler,
        itemIsFavorite: itemIsFavoriteHandler
    }

    function addFavoriteHandler(favoriteMeetup) {
        // 直接設置 setUserFavorites(xxx) 可能會因為時間差有順序不一致或物件不見
        setUserFavorites(latestUserFavorites => {
            return latestUserFavorites.concat(favoriteMeetup)
        })
    }

    function removeFavoriteHandler(meetupId) {
        setUserFavorites(latestUserFavorites => {
            return latestUserFavorites.filter(meetup => meetupId !== meetup.id)
        })
    }

    function itemIsFavoriteHandler(meetupId) {
        return userFavorites.some(meetup => meetup.id === meetupId)
    }

    return <FavoritesContext.Provider value={context}>
        {props.children}
    </FavoritesContext.Provider>
}

export default FavoritesContext