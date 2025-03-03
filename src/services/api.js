import axios from 'axios';

const API_URL = 'https://to-do-list-django-psi.vercel.app/api/';
//'http://127.0.0.1:8000/api/';
//'https://to-do-list-django-otg2ui3oj-gianghks-projects.vercel.app/api/'

// Create axios instance with credentials
const apiClient = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add token to requests if available
apiClient.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Token ${token}`;
    }
    return config;
});

// Auth Service
export const authService = {
    login: async(credentials) => {
        const response = await apiClient.post('login/', credentials);
        // Store the token when login is successful
        if (response.data && response.data.token) {
            localStorage.setItem('token', response.data.token);
        }
        return response.data;
    },
    logout: async() => {
        try {
            // Send logout request to invalidate token on server
            await apiClient.post('logout/');
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            // Always remove token from localStorage
            localStorage.removeItem('token');
        }
        return { success: true };
    },
    getCurrentUser: async() => {
        const response = await apiClient.get('user/');
        return response.data;
    },
    // Check if user is authenticated
    isAuthenticated: () => {
        return localStorage.getItem('token') !== null;
    }
};

// Todo Service
export const todoService = {
    getAllTodos: async() => {
        const response = await apiClient.get('todos/');
        return response.data;
    },
    getTodo: async(id) => {
        const response = await apiClient.get(`todos/${id}/`);
        return response.data;
    },
    createTodo: async(todo) => {
        const response = await apiClient.post('todos/', todo);
        return response.data;
    },
    updateTodo: async(id, todo) => {
        const response = await apiClient.put(`todos/${id}/`, todo);
        return response.data;
    },
    changeTodoStatus: async(id, status) => {
        const response = await apiClient.patch(`todos/${id}/`, { status });
        return response.data;
    },
    deleteTodo: async(id) => {
        const response = await apiClient.delete(`todos/${id}/`);
        return response.data;
    },
};