import { useState, useEffect } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { Navigate } from "react-router-dom";
import Loader from "../components/Loader/loader";

export default function Private({ children }) {
    const [loading, setLoading] = useState(true);
    const [signed, setSigned] = useState(false);

    useEffect(() => {
        async function checkLogin() {
            const unsub = onAuthStateChanged(auth, (user) => {
                if (user) {
                    const userData = {
                        uid: user.uid,
                        email: user.email,
                    };

                    localStorage.setItem("@detailUser", JSON.stringify(userData))

                    setLoading(false);
                    setSigned(true);

                } else {
                    setLoading(false);
                    setSigned(false);
                }
            })
        }

        checkLogin();
    }, [])

    if (loading) {
        return (
            <div>
                <Loader />
            </div>
        )
    }

    if (!signed) {
        console.log('Usuário não autenticado.')
        return <Navigate to="/login" />
    }
    return children;
}