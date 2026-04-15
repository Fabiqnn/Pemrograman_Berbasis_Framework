import {
    getFirestore,
    collection,
    getDocs,
    doc,
    getDoc,
    query,
    addDoc,
    where,
    updateDoc,
    QuerySnapshot,
    DocumentData
} from "firebase/firestore"
import app from "./firebase"
import bcrypt from "bcrypt"

const db = getFirestore(app)
const usersCollection = collection(db, "users");

type UserRole = "user" | "admin" | "editor";

export type UserDocument = {
    id?: string;
    email: string;
    fullname: string;
    password?: string;
    role?: UserRole;
    image?: string;
    type?: string;
};

type ServiceResult<T = undefined> = {
    status: "success" | "error";
    message: string;
    data?: T;
};

function mapSnapshotDocs<T extends Record<string, unknown>>(snapshot: QuerySnapshot<DocumentData>) {
    return snapshot.docs.map((docItem) => ({
        id: docItem.id,
        ...(docItem.data() as T)
    })) as Array<T & { id: string }>;
}

export async function retrieveProducts(collectionName: string) {
    const snapshot = await getDocs(collection(db, collectionName));
    return mapSnapshotDocs(snapshot);
}

export async function retrieveDataByID(collectionName: string, id: string) {
    const snapshot = await getDoc(doc(db, collectionName, id));
    const data = snapshot.data();
    return data;
}

export async function getUserByEmail(email: string) {
    const usersQuery = query(usersCollection, where("email", "==", email));
    const querySnapshot = await getDocs(usersQuery);
    const data = mapSnapshotDocs<UserDocument>(querySnapshot);
     return data.length > 0 ? data[0] : null;
}

export async function createUser(userData: UserDocument) {
    const userPayload = {
        ...userData,
        role: userData.role ?? "user"
    };
    const docRef = await addDoc(usersCollection, userPayload);
    return {
        id: docRef.id,
        ...userPayload
    };
}

export async function updateUserById(id: string, userData: Partial<UserDocument>) {
    await updateDoc(doc(db, "users", id), userData);
    return {
        id,
        ...userData
    };
}

export async function registerUser(userData: UserDocument): Promise<ServiceResult> {
    try {
        const existingUser = await getUserByEmail(userData.email);
        if (existingUser) {
            return {
                status: "error",
                message: "User already exist"
            };
        }

        const hashedPassword = await bcrypt.hash(userData.password as string, 10);
        await createUser({
            ...userData,
            password: hashedPassword,
            role: userData.role ?? "user"
        });

        return {
            status: "success",
            message: "User registered successfully"
        };
    } catch (error: any) {
        return {
            status: "error",
            message: error.message || "Failed to register user"
        };
    }
}

export async function syncOAuthUser(userData: UserDocument): Promise<ServiceResult<UserDocument>> {
    try {
        const existingUser = await getUserByEmail(userData.email);

        if (existingUser?.id) {
            const mergedUser = {
                ...existingUser,
                ...userData,
                role: existingUser.role ?? "user"
            };
            await updateUserById(existingUser.id, mergedUser);
            return {
                status: "success",
                message: "User logged in successfully",
                data: mergedUser
            };
        }

        const newUser = await createUser({
            ...userData,
            role: userData.role ?? "user"
        });
        return {
            status: "success",
            message: "User registered and logged in successfully",
            data: newUser
        };
    } catch (error: any) {
        return {
            status: "error",
            message: error.message || "Failed to sync OAuth user"
        };
    }
}

// Backward-compatible wrappers for current auth flow.
export async function signIn(email: string) {
    return getUserByEmail(email);
}

export async function signUp(userData: UserDocument) {
    return registerUser(userData);
}

export async function signInWithGoogle(userData: UserDocument) {
    return syncOAuthUser(userData);
}
