import { Course } from '../types';
import { api } from './api';

export const getCourses = async (): Promise<Course[]> => {
    return api.get<Course[]>('/attendance/courses');
};

export const addCourse = async (name: string, color: string): Promise<Course> => {
    return api.post<Course>('/attendance/courses', { name, color });
};

export const deleteCourse = async (courseId: string): Promise<void> => {
    return api.delete(`/attendance/courses/${courseId}`);
};

export const markAttendance = async (courseId: string, dateString: string, status: 'attended' | 'missed'): Promise<Course> => {
    return api.patch<Course>(`/attendance/courses/${courseId}/mark`, { date: dateString, status });
};
