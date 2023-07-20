import { useEffect, useState } from "react";

const useAdmin = email => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [isAdminLoading, setIsAdminLoading] = useState(true)
    useEffect(() => {
        if (email) {
            fetch(`http://localhost:5000/users/isadmin?email=${email}`)
                .then(res => res.json())
                .then(data => {
                    setIsAdmin(data.isAdmin);
                    return setIsAdminLoading(false);
                })
        }
    }, [email, isAdminLoading])
    
    return [isAdmin, isAdminLoading]
}

export default useAdmin;