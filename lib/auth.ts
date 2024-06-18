// auth.ts
// Define the user interface
interface User {
    id: number;
    email: string;
    password: string;
    name: string;
  }
  
  // Mock user data for demonstration purposes
  const users: User[] = [
    { id: 1, email: 'user1@example.com', password: 'password1', name: 'User 1' },
    { id: 2, email: 'user2@example.com', password: 'password2', name: 'User 2' },
  ];
  
  // Function to simulate user login
  export async function loginUser(email: string, password: string): Promise<User> {
    // Simulate API call or database query to check user credentials
    const user = users.find(u => u.email === email && u.password === password);
  
    if (!user) {
      throw new Error('Invalid email or password');
    }
  
    // Simulate setting user session or token after successful login
    localStorage.setItem('user', JSON.stringify(user));
  
    return user;
  }
  
  // Function to simulate user logout
  export async function logoutUser(): Promise<void> {
    // Simulate clearing user session or token on logout
    localStorage.removeItem('user');
  }
  
  // Function to check if user is logged in
  export function isLoggedIn(): boolean {
    // Check if user session or token exists
    return !!localStorage.getItem('user');
  }
  
  // Function to get current logged-in user
  export function getCurrentUser(): User | null {
    // Get user data from session or token
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  }
  