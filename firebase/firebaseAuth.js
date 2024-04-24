import { auth } from './firebaseConfig';
import { signInWithEmailAndPassword, onAuthStateChanged, signOut as signOutFirebase } from 'firebase/auth'

export async function login(email, password) {
  let data;

  await signInWithEmailAndPassword(auth, email, password)
    .then(({ user: { accessToken, email } }) => data = { data: { accessToken, email } })
    .catch(({ code }) =>
      data = { error: code == "auth/invalid-credential" ? "El email o la contraseña son incorrectos" : "Hubo un error" }
    );

  return data;
}

export function getUser(callback) {
  onAuthStateChanged(auth, (user) =>
    callback(user ? user : {}))
}

export async function signOut() {
  return await signOutFirebase(auth);
}