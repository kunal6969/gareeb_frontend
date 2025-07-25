import { CgpaData } from '../types';
import { api } from './api';

const LOCAL_STORAGE_KEY = 'mnit_live_cgpa_data';

// Helper function to get data from localStorage
const getLocalData = (): CgpaData => {
    try {
        const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (stored) {
            return JSON.parse(stored);
        }
    } catch (error) {
        console.warn('Failed to parse local CGPA data:', error);
    }
    return { semesters: [{ id: `sem-new`, sgpa: '', credits: '' }] };
};

// Helper function to save data to localStorage
const saveLocalData = (data: CgpaData): void => {
    try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
        console.warn('Failed to save CGPA data locally:', error);
    }
};

// Helper function to check if user is authenticated
const isAuthenticated = (): boolean => {
    return !!localStorage.getItem('authToken');
};

export const getCgpaData = async (): Promise<CgpaData> => {
    // If user is authenticated, try to get data from server
    if (isAuthenticated()) {
        try {
            const data = await api.get<CgpaData>('/cgpa');
            // Ensure there's always at least one semester card for the UI
            if (!data || !data.semesters || data.semesters.length === 0) {
                return { semesters: [{ id: `sem-new`, sgpa: '', credits: '' }] };
            }
            return data;
        } catch (error) {
            console.error("Failed to get CGPA data from server, falling back to local storage.", error);
            return getLocalData();
        }
    } else {
        // If not authenticated, use local storage
        return getLocalData();
    }
};

export const saveCgpaData = async (data: CgpaData): Promise<CgpaData> => {
    // Filter out empty semesters before saving
    const filteredData = {
        ...data,
        semesters: data.semesters.filter(sem => sem.sgpa.trim() !== '' && sem.credits.trim() !== ''),
    };
    
    // Save to local storage regardless of authentication status
    saveLocalData(filteredData);
    
    // If user is authenticated, also try to save to server
    if (isAuthenticated()) {
        try {
            return await api.post<CgpaData>('/cgpa', filteredData);
        } catch (error) {
            console.warn("Failed to save CGPA data to server, but saved locally.", error);
            return filteredData;
        }
    }
    
    return filteredData;
};
