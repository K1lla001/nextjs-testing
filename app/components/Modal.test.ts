import { render, fireEvent } from '@testing-library/react';
import Modal from './Modal';

describe('Modal Component', () => {
    const mockSetModalOpen = jest.fn();

    const renderModal = (modalOpen: boolean) => {
        return render(
            <Modal modalOpen={modalOpen} setModalOpen={mockSetModalOpen}>
            <div>Modal Content</div>
        </Modal>
    );
    };

    test('renders modal closed initially', () => {
        const { container } = renderModal(false);
        const modal = container.querySelector('.modal');
        expect(modal).toBeTruthy();
        expect(modal).not.toHaveClass('modal-open');
    });

    test('renders modal open when modalOpen prop is true', () => {
        const { container } = renderModal(true);
        const modal = container.querySelector('.modal');
        expect(modal).toBeInTheDocument();
        expect(modal).toHaveClass('modal-open');
    });

    test('closes modal when close button is clicked', () => {
        const { getByText } = renderModal(true);
        const closeButton = getByText('✕');
        fireEvent.click(closeButton);
        expect(mockSetModalOpen).toHaveBeenCalledWith(false);
    });
});
