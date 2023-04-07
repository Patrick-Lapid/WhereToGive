import React, { useContext, useState } from 'react'

export const LINKS = {
    LANDING: "Home",
    DASHBOARD: "Charity Browse",
    SEARCH : "Charity Search",
    SAVED_CHARITIES : "Saved Charities",
    USER_DASHBOARD : "Analytics",
    SETTINGS : "User Settings"
}

type NavigateContextInterface = {
    activeLink : string;
    activeProfileSection : string;
    updateLink : React.Dispatch<React.SetStateAction<string>>;
    updateActiveProfileSection : React.Dispatch<React.SetStateAction<string>>;
}

type NavigateContextType = NavigateContextInterface;
const NavigateContext = React.createContext<NavigateContextType>({} as NavigateContextInterface)

export function useNavigateContext() {
    return useContext(NavigateContext);
}

export function NavigateProvider({ children } : any){

    const [currLink, setCurrLink] = useState<string>(LINKS.LANDING);
    const [currProfileSection, setCurrProfileSection] = useState<string>(LINKS.SAVED_CHARITIES);
    
    const value : NavigateContextInterface = {
        activeLink : currLink,
        activeProfileSection : currProfileSection,
        updateActiveProfileSection : setCurrProfileSection,
        updateLink : setCurrLink
    }
    
    return(
        <NavigateContext.Provider value={value}>
            {children}
        </NavigateContext.Provider>
    );
    
}