import { collection, getDocs, getDoc, setDoc, doc, orderBy, limit, query, where, updateDoc } from 'firebase/firestore'
import { fs } from './firebaseConfig';

import { EVENTS_STATUS } from '../types'

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


export async function getInfluencerRef(influencerRef) {
    if (!influencerRef) return { ref: {} };

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
    const { Documento, group, selectedLocation, FechaInicio, FechaNacimiento, influencer, ...payload } = data;

    if (Object.values(data).reduce((a, c) => !c ? true : a, false)) return;

    const { address, display_name, name, lat, lon, place_id, licence } = selectedLocation;
    const Direccion = { address, display_name, name, lat, lon, place_id, licence };
    const Grupos = Object.entries(group).filter(([, v]) => v).map(([k]) => doc(fs, `/grupos/${k}`));

    const generarId = () => Math.random().toString(36).substr(2, 10);

    await setDoc(doc(fs, "personas", generarId()), {
        ...payload,
        Documento,
        Direccion,
        Grupos,
        Influencer: doc(fs, `personas/${influencer}`),
        "Fecha de Nacimiento": FechaNacimiento,
        "Fecha de Inicio": FechaInicio
    });
}

export async function getEventsByRefs(eventsRefs) {
    const response = [];

    if (!eventsRefs) return;

    for (let i = 0; i < eventsRefs.length; i++) {
        const res = (await getDoc(eventsRefs[i])).data();

        response.push({
            ...res,
            id: eventsRefs[i].id,
            FechaFinalizacion: res["Fecha de Finalizacion"].toDate().toDateString(),
            FechaInicio: res["Fecha de Inicio"].toDate().toDateString(),
            status: res["Fecha de Finalizacion"].toDate().getTime() - Date.now() < 0
                ? EVENTS_STATUS.INACTIVE
                : res["Fecha de Inicio"].toDate().getTime() - Date.now() > 0
                    ? EVENTS_STATUS.SOON
                    : EVENTS_STATUS.ACTIVE,
        })
    }

    for (let i = 0; i < response.length; i++) {
        const tempAsistentcias = [];

        for (let j = 0; j < response[i].Asistencias.length; j++) {
            if (!response[i].Asistencias[j]) break;

            const res = (await getDoc(response[i].Asistencias[j])).data();

            tempAsistentcias.push({ ...res });
        }

        response[i].Asistencias = [...tempAsistentcias];
    }

    return response;
}

export async function getGroupMembers(groupRef) {
    const response = (await getDoc(groupRef)).data();

    const tempMiembros = [];

    for (let i = 0; i < response.Miembros.length; i++) {
        if (!response.Miembros[i]) break;

        const res = (await getDoc(response.Miembros[i])).data();

        tempMiembros.push({ ...res });
    }

    response.Miembros = [...tempMiembros];

    return response.Miembros;
}

export async function updateInscribedPersons(inscribedPersons, event) {
    const res = [];

    for (let i = 0; i < inscribedPersons.length; i++) {
        const p = inscribedPersons[i];

        const response = [];

        const querySnapshot = await getDocs(query(collection(fs, "personas"), where("Documento", "==", p.Documento)));
        querySnapshot.forEach((doc2) => response.push(doc(fs, "personas", doc2.id)));

        res.push(response[0])
    }

    await updateDoc(doc(fs, "eventos", event.id), {
        Asistencias: res
    })

    return res;
}