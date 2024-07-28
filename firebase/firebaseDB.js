import { collection, getDocs, getDoc, setDoc, doc, orderBy, limit, query, where, updateDoc, deleteDoc } from 'firebase/firestore'
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
        data[i].Influencer.id = Influencer?.id;
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

export async function getServices() {
    const response = [];

    const querySnapshot = await getDocs(query(collection(fs, "servicios")));
    querySnapshot.forEach((doc) => response.push({ ...doc.data(), id: doc.id }));

    const servicios = response.map((res) => ({
        ...res,
    }));

    return servicios
}

export async function createUser(data) {
    const {
        Documento,
        group,
        service,
        selectedLocation,
        influencer,
        FechaInicio,
        FechaNacimiento,
        ...payload } = data;

    if (!FechaInicio && !FechaNacimiento) return;

    if (Object.values(data).reduce((a, c) => !c ? true : a, false)) return;

    const { address, display_name, name, lat, lon, place_id, licence } = selectedLocation;
    const Direccion = { address, display_name, name, lat, lon, place_id, licence };
    const Grupos = Object.entries(group).filter(([, v]) => v).map(([k]) => doc(fs, `/grupos/${k}`));
    const Servicios = Object.entries(service).filter(([, v]) => v).map(([k]) => doc(fs, `/servicios/${k}`));

    const generarId = () => Math.random().toString(36).substr(2, 10);
    const ID = generarId();

    await setDoc(doc(fs, "personas", ID), {
        ...payload,
        Documento,
        Direccion,
        Grupos,
        Servicios,
        Influencer: doc(fs, `personas/${influencer}`),
    });

    for (let i = 0; i < Grupos.length; i++) {
        const g = Grupos[i];

        const membersGroup = (await getDoc(g)).data().Miembros;

        membersGroup.push(doc(fs, "personas", ID))

        await updateDoc(g, {
            Miembros: membersGroup
        })
    }

    for (let i = 0; i < Servicios.length; i++) {
        const s = Servicios[i];

        const membersService = (await getDoc(s)).data().Miembros;

        membersService.push(doc(fs, "personas", ID))

        await updateDoc(s, {
            Miembros: membersService
        })
    }

    return true;
}

export async function updateUser(data) {
    const {
        Documento,
        group,
        service,
        selectedLocation,
        influencer,
        FechaInicio,
        FechaNacimiento,
        id,
        ...payload } = data;

    if (!FechaInicio && !FechaNacimiento) return;

    if (Object.values(data).reduce((a, c) => !c ? true : a, false)) return;

    const { address, display_name, name, lat, lon, place_id, licence } = selectedLocation;
    const Direccion = { address, display_name, name, lat, lon, place_id, licence };
    const Grupos = Object.entries(group).filter(([, v]) => v).map(([k]) => doc(fs, `/grupos/${k}`));
    const Servicios = Object.entries(service).filter(([, v]) => v).map(([k]) => doc(fs, `/servicios/${k}`));

    await updateDoc(doc(fs, "personas", id), {
        ...payload,
        Documento,
        Direccion,
        Grupos,
        Servicios,
        Influencer: doc(fs, `personas/${influencer}`),
    });

    const otherGrupos = Object.entries(group).map(([k]) => doc(fs, `/grupos/${k}`));
    const otherServicios = Object.entries(service).map(([k]) => doc(fs, `/servicios/${k}`));

    // Delete References in groups and services
    for (let i = 0; i < otherGrupos.length; i++) {
        const g = otherGrupos[i];

        const membersGroup = (await getDoc(g)).data().Miembros;

        const updatedMembersGroup = membersGroup.filter(m => m.id != id)

        await updateDoc(g, {
            Miembros: updatedMembersGroup
        })
    }

    for (let i = 0; i < otherServicios.length; i++) {
        const s = otherServicios[i];

        const membersService = (await getDoc(s)).data().Miembros;

        const updatedMembersService = membersService.filter(m => m.id != id)

        await updateDoc(s, {
            Miembros: updatedMembersService
        })
    }

    // Rereference in groups and services
    for (let i = 0; i < Grupos.length; i++) {
        const g = Grupos[i];

        const membersGroup = (await getDoc(g)).data().Miembros;

        membersGroup.push(doc(fs, "personas", id))

        await updateDoc(g, {
            Miembros: membersGroup
        })
    }

    for (let i = 0; i < Servicios.length; i++) {
        const s = Servicios[i];

        const membersService = (await getDoc(s)).data().Miembros;

        membersService.push(doc(fs, "personas", id))

        await updateDoc(s, {
            Miembros: membersService
        })
    }

    return true;
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
        const tempAsistencias = [];

        for (let j = 0; j < response[i].Asistencias.length; j++) {
            if (!response[i].Asistencias[j]) break;

            const res = (await getDoc(response[i].Asistencias[j])).data();

            tempAsistencias.push({ ...res });
        }

        response[i].Asistencias = [...tempAsistencias];
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

export async function deletePerson(person) {
    await deleteDoc(doc(fs, "personas", person.id))

    for (let i = 0; i < person.Grupos.length; i++) {
        const g = person.Grupos[i];

        const membersGroup = (await getDoc(g)).data().Miembros;

        const updatedMembersGroup = membersGroup.filter(m => m.id != person.id)

        await updateDoc(g, {
            Miembros: updatedMembersGroup
        })
    }

    for (let i = 0; i < person.Servicios.length; i++) {
        const s = person.Servicios[i];

        const membersService = (await getDoc(s)).data().Miembros;

        const updatedMembersService = membersService.filter(m => m.id != person.id)

        await updateDoc(s, {
            Miembros: updatedMembersService
        })
    }

    return person;
}

export async function createEvent() {}

export async function updateEvent() {}