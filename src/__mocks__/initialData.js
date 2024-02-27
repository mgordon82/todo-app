const mockTodos = [
  {
    id: '7f9f5a01',
    summary: 'Buy groceries',
    description: 'Milk, bread, eggs, and cheese',
    completed: false,
    completedDate: null,
    createdDate: '2024-02-23T08:00:00Z',
  },
  {
    id: 'e12a6b33',
    summary: 'Fix leaking faucet',
    description: 'Check under the sink for the issue',
    completed: true,
    completedDate: '2024-02-22T15:30:00Z',
    createdDate: '2024-02-20T10:15:00Z',
  },
];

export const getAllTodos = jest.fn(() => Promise.resolve(mockTodos));
export const addTodo = jest.fn(() => Promise.resolve());
export const toggleTodo = jest.fn(() => Promise.resolve());
export const deleteTodo = jest.fn(() => Promise.resolve());
