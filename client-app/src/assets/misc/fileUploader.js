import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../auth/Firebase";

export const UploadFile = async (file) => {
    if (!file) return;
    const storageRef = ref(storage, `/files/${file.name}`);
    let url = ""
    await uploadBytesResumable(storageRef, file).then(async (snapshot) => {
        const result = await getDownloadURL(snapshot.ref)
        url = result
    });
    return url;
};