import { User } from '@/types/user';

export const users: User[] = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Admin',
    department: 'Management',
    status: 'Active',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'User',
    department: 'Engineering',
    status: 'Active',
  },
  {
    id: 3,
    name: 'Mike Johnson',
    email: 'mike@example.com',
    role: 'User',
    department: 'Production',
    status: 'Inactive',
  },
];

export function filterUsers(users: User[], filters: { search: string; status: string }): User[] {
  return users.filter((user) => {
    const matchesSearch = !filters.search || 
      user.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      user.email.toLowerCase().includes(filters.search.toLowerCase());
    
    const matchesStatus = filters.status === 'all' || user.status === filters.status;
    
    return matchesSearch && matchesStatus;
  });
}

export function addUser(user: Partial<User>): User {
  const newUser: User = {
    id: Math.max(...users.map(u => u.id)) + 1,
    name: user.name!,
    email: user.email!,
    role: user.role!,
    department: user.department!,
    status: user.status!,
  };
  users.push(newUser);
  return newUser;
}

export function updateUser(id: number, userData: Partial<User>): User {
  const index = users.findIndex(u => u.id === id);
  if (index === -1) throw new Error('User not found');
  
  users[index] = { ...users[index], ...userData };
  return users[index];
}

export function deleteUser(id: number): void {
  const index = users.findIndex(u => u.id === id);
  if (index === -1) throw new Error('User not found');
  
  users.splice(index, 1);
}