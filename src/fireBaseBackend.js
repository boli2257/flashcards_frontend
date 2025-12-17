import { addDoc, collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore"
import { db } from "./fireBaseApp"


export const addTopic = async (name) => {
    console.log(name)
    try {
        const collectionRef = collection(db, "topics")
        const q = query(collectionRef, where("name","==",name))
        const querySnapshot = await getDocs(q)
        if(!querySnapshot.empty){
            console.log("Ez a téma már létezik!")
            return
        }
        await addDoc(collectionRef, {name})

    } catch (error) {
        console.log("Hiba a témakör hozzáadásakor: ", error)
    }
}

export const addCard = async (topicId, card) => {
    try {
        const subColRef = collection(db, "topics", topicId, "cards")
        await addDoc(subColRef, {...card})
    } catch (error) {
        console.log("Kártya létrehozási hiba: ", error)
    }
}

export const readTopicsOnce = async (setTopics) => {

    try {
        const docRef = collection(db, "topics")
        const snap = await getDocs(docRef)
        setTopics(snap.docs.map((d)=>({id: d.id, ...d.data() }) ))
    } catch (error) {
        console.log("Téma lekérési hiba: ", error)
        return null
    }
}

export const readCardsOnce = async (topicId, setCards) => {
    try {
        const subColRef = collection(db, "topics", topicId, "cards")
        const snap = await getDocs(subColRef)
        setCards(snap.docs.map((d)=>({id: d.id, ...d.data() }) ))
    } catch (error) {
        console.log("Egyszeri kártya lekérési hiba: ", error)
        return []
    }

}

export const deleteCard = async (topicId, cardId) => {
        console.log(topicId, cardId)
        const docRef = doc(db, "topics", topicId, "cards", cardId)
        await deleteDoc(docRef)
}

export const deleteTopic = async (topicId) => {
        const docRef = doc(db, "topics", topicId)
        await deleteDoc(docRef)
}