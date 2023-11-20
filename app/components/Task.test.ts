import { render, fireEvent, waitFor } from '@testing-library/react';
import Task from './Task';

jest.mock('next/router', () => ({
    useRouter: () => ({
        refresh: jest.fn(),
    }),
}));

jest.mock('@/api', () => ({
    editTodo: jest.fn(),
    deleteTodo: jest.fn(),
}));

describe('Task Component', () => {
    const mockTask = {
        id: '1',
        text: 'Sample Task',
    };

    test('renders task with edit and delete buttons', () => {
        const { getByText, getByTestId } = render(<Task task={mockTask} />);

        const taskText = getByText(mockTask.text);
        expect(taskText).toBeInTheDocument();

        const editButton = getByTestId('edit-button');
        const deleteButton = getByTestId('delete-button');

        expect(editButton).toBeInTheDocument();
        expect(deleteButton).toBeInTheDocument();
    });

    test('opens edit modal when edit button is clicked', () => {
        const { getByTestId, getByText } = render(<Task task={mockTask} />);
        const editButton = getByTestId('edit-button');
        fireEvent.click(editButton);

        const editModal = getByText('Edit task');
        expect(editModal).toBeInTheDocument();
    });

    test('submits edited task when edit form is submitted', async () => {
        const { getByTestId, getByText } = render(<Task task={mockTask} />);
        const editButton = getByTestId('edit-button');
        fireEvent.click(editButton);

        const editInput = getByTestId('edit-input');
        fireEvent.change(editInput, { target: { value: 'Edited Task' } });

        const submitButton = getByText('Submit');
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(editTodo).toHaveBeenCalledWith({ id: mockTask.id, text: 'Edited Task' });
        });
    });

    test('opens delete modal when delete button is clicked', () => {
        const { getByTestId, getByText } = render(<Task task={mockTask} />);
        const deleteButton = getByTestId('delete-button');
        fireEvent.click(deleteButton);

        const deleteModal = getByText('Are you sure, you want to delete this task?');
        expect(deleteModal).toBeInTheDocument();
    });

    test('deletes task when Yes button is clicked in delete modal', async () => {
        const { getByTestId } = render(<Task task={mockTask} />);
        const deleteButton = getByTestId('delete-button');
        fireEvent.click(deleteButton);

        const yesButton = getByTestId('delete-yes-button');
        fireEvent.click(yesButton);

        await waitFor(() => {
            expect(deleteTodo).toHaveBeenCalledWith(mockTask.id);
        });
    });
});
