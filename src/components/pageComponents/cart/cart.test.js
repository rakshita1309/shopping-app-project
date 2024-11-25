import { render, screen, fireEvent } from '@testing-library/react';
import CartPage from './CartPage';
import ItemStore from '../../../stores/Items/ItemStore';

// Mocking ItemStore to simulate a non-empty cart
jest.mock('../../../stores/Items/ItemStore', () => ({
  cartItems: [1, 2], // Simulating two cart items
  allItems: {
    1: { price: 100 },
    2: { price: 200 }
  }
}));

jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null
    };
  }
}));

test('applies valid coupon and updates discount', () => {
  render(<CartPage />);

  const couponInput = screen.getByPlaceholderText(/Enter coupon code/i);
  const applyButton = screen.getByRole('button', { name: /Apply Coupon/i });

  // Apply a valid coupon
  fireEvent.change(couponInput, { target: { value: 'SAVE20' } });
  fireEvent.click(applyButton);

  // Check that the discount was applied correctly
  expect(screen.getByText('Discount: (20 %)')).toBeInTheDocument();
});
