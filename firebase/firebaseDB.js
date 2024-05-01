import { collection, getDocs, getDoc, setDoc, doc, orderBy, limit, query, where } from 'firebase/firestore'
import { fs } from './firebaseConfig';

export async function getPersons({ order, filter, influencerRef }) {
    const response = [];

    const queryOpt = !influencerRef ?
        query(collection(fs, "personas"),
            orderBy(order.orderBy, order.type),
            limit(10),
        ) :
        query(collection(fs, "personas"),
            where("Influencer", "==", influencerRef),
            // limit(10),
        )

    const querySnapshot = await getDocs(queryOpt)

    querySnapshot.forEach((doc) => response.push({ ...doc.data(), id: doc.id }));

    const data = response.map((res) => ({
        ...res,
        FechaNacimiento: res["Fecha de Nacimiento"].toDate().toDateString(),
        FechaInicio: res["Fecha de Inicio"].toDate().toDateString(),
        Edad: (new Date).getFullYear() - res["Fecha de Nacimiento"].toDate().getFullYear(),
    }));


    for (let i = 0; i < data.length; i++) {
        const { Influencer } = data[i];
        data[i].Influencer = Influencer ? (await getDoc(doc(fs, "personas", Influencer.id))).data() : { Nombre: "N/A" };
    }

    const filteredData = (
        data.map((res) =>
        (Object
            .entries(filter)
            .map(([key, value]) => res[key].toString().toLowerCase().includes(value.toLowerCase())))
        ))

        .map((f) => {
            let find = true;

            f.forEach((fThis) => { if (!fThis) return find = false })

            return find
        })
        .map((f, i) => f ? data[i] : false)
        .filter((f) => f !== false)

    return filteredData;
}

export async function getInfluencer(email) {
    const response = [];

    const querySnapshot = await getDocs(query(collection(fs, "roles"), where("Email", "==", email)));
    querySnapshot.forEach((doc) => response.push({ ...doc.data(), id: doc.id }));

    const influencer = response.map((res) => ({
        ...res,
        Referencia: `/personas/${res.id}`
    }));

    return influencer[0]
}

export async function getInfluencerRef(influencerRef) {
    const res = await getDoc(doc(fs, influencerRef));

    return res;
}

export async function getInfluencers() {
    const response = [];

    const querySnapshot = await getDocs(query(collection(fs, "roles"), where("Rol", "in", ["Admin/Influencer", "Influencer"])));
    querySnapshot.forEach((doc) => response.push({ ...doc.data(), id: doc.id }));

    const influencers = response.map((res) => ({
        ...res,
    }));

    return influencers
}

export async function getGroups() {
    const response = [];

    const querySnapshot = await getDocs(query(collection(fs, "grupos")));
    querySnapshot.forEach((doc) => response.push({ ...doc.data(), id: doc.id }));

    const grupos = response.map((res) => ({
        ...res,
    }));

    return grupos
}

export async function createUser(data) {
    const { Documento, group, selectedLocation, FechaInicio, FechaNacimiento, ...payload } = data;

    if (Object.values(data).reduce((a, c) => !c ? true : a, false)) return;

    const { address, display_name, name, lat, lon, place_id, licence } = selectedLocation;
    const Direccion = { address, display_name, name, lat, lon, place_id, licence };
    const Grupos = Object.entries(group).filter(([, v]) => v).map(([k]) => `/grupos/${k}`);

    // TODO: Fix the upload of the influencer and the groups.

    await setDoc(doc(fs, "personas", Documento), {
        ...payload,
        Direccion,
        Grupos,
        "Fecha de Nacimiento": FechaNacimiento,
        "Fecha de Inicio": FechaInicio
    });
}