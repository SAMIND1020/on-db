import { auth, fs } from './firebaseConfig';
import { signInWithEmailAndPassword, onAuthStateChanged, signOut as signOutFirebase, sendPasswordResetEmail } from 'firebase/auth'
import { getDocs, query, collection, where } from 'firebase/firestore'

export async function login(email, password) {
    let data;

    await signInWithEmailAndPassword(auth, email, password)
        .then(({ user }) => data = { data: { ...user } })
        .catch(({ code }) =>
            data = { error: code == "auth/invalid-credential" ? "El email o la contraseña son incorrectos" : "Hubo un error" }
        );

    return data;
}

export async function getUser() {
    // Get User
    const user = await new Promise((resolve) => onAuthStateChanged(auth, resolve));

    if (!user || !user?.uid) return {};

    // Get Influencer
    const response = [];

    const querySnapshot = await getDocs(query(collection(fs, "roles"), where("Email", "==", user.email)));
    querySnapshot.forEach((doc) => response.push({ ...doc.data(), id: doc.id }));

    const [influencer] = response.map((res) => ({
        ...res,
        Referencia: `/personas/${res.id}`
    }));

    return { user, influencer }
}

export async function signOut() {
    return await signOutFirebase(auth);
}

export async function resetPassword(email) {
    await sendPasswordResetEmail(auth, email);
}