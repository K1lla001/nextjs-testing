import { render, screen, fireEvent } from '@testing-library/react';
import { addTodo } from '@/api';
import AddTask from "@/app/components/AddTask";

jest.mock('@/api', () => ({
    addTodo: jest.fn(),
}));

describe('AddTask component', () => {
    it('renders AddTask component correctly', () => {
        render(< AddTask/>);
        const addButton = screen.getByText('Add new task');
        expect(addButton).toBeTruthy();
    });

    it('opens modal when add button is clicked', () => {
        render(<AddTask />);
        const addButton = screen.getByText('Add new task');
        fireEvent.click(addButton);
        const modalTitle = screen.getByText('Add new task');
        expect(modalTitle).toBeTruthy();
    });

    it('submits new task when form is submitted', async () => {
        render(<AddTask />);
        const addButton = screen.getByText('Add new task');
        fireEvent.click(addButton);
        const input = screen.getByPlaceholderText('Type here');
        fireEvent.change(input, { target: { value: 'New Task' } });
        const submitButton = screen.getByText('Submit');
        fireEvent.click(submitButton);
        expect(addTodo).toHaveBeenCalledWith({ id: expect.any(String), text: 'New Task' });
    });
});
