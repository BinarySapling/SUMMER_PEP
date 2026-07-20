import { createContext, useState } from "react";

export const UserContext = createContext();

function UserProvider({ children }) {
    const [user, setUser] = useState(() => {
        const stored = localStorage.getItem("user");
        try {
            return stored ? JSON.parse(stored) : null;
        } catch (error) {
            return null;
        }
    });

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}

export default UserProvider;
