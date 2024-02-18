import axios from 'axios';

export const fetchNatures = async () => {
    try {
        const response = await axios.get('http://localhost:8080/natures');
        const natureIds = response.data.map((nature: any) => nature.natureId);
        return natureIds;
    } catch (error) {
        console.error('Error fetching natures:', error);
        return [];
    }
};

export const fetchDepots = async () => {
    try {
        const response = await axios.get('http://localhost:8080/depots');
        const depotNames = response.data.map((depot: any) => depot.depot);
        return depotNames;
    } catch (error) {
        console.error('Error fetching depots:', error);
        return [];
    }
};

export const fetchUsers = async () => {
    try {
        // Faites l'appel à l'API pour récupérer les utilisateurs
        const response = await axios.get('http://localhost:8080/users');
        
        // Retournez les données d'utilisateurs si la requête est réussie
        return response.data.map((user: any) => user.utilisateur);
    } catch (error) {
        // Gérez les erreurs ici
        console.error('Error fetching users:', error);
        return []; // Retournez un tableau vide en cas d'erreur
    }
};


export const fetchGrpUsers = async () => {
    try {
        const response = await axios.get('http://localhost:8080/grpusers');
        return response.data.map((grpUser: any) => grpUser.grpUtilisateur);
    } catch (error) {
        console.error('Error fetching group users:', error);
        return [];
    }
};

export const fetchBienAcquis = async () => {
    try {
        const response = await axios.get('http://localhost:8080/bienacquis');
        return response.data;
    } catch (error) {
        console.error('Error fetching bien acquis:', error);
        return [];
    }
};

export const fetchNonRendu =async () => {
    try {
        const response = await axios.get('http://localhost:8080/getNonRendu');
        return response.data;
    } catch (error) {
        console.error('Error fetching bien acquis:', error);
        return [];
    }
}

export const fetchMisANveau =async () => {
    try {
        const response = await axios.get('http://localhost:8080/getAnomalie');
        return response.data;
    } catch (error) {
        console.error('Error fetching bien acquis:', error);
        return [];
    }
}