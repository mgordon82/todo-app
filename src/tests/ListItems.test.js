import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import App from '../App';

jest.mock('../__mocks__/initialData.js');

describe('ListItems', () => {
  test('opens dialog box to add a todo item', async () => {
    const { getByText } = render(<App />);
    await waitFor(() => {
      const addButton = getByText('Add New Todo');

      fireEvent.click(addButton);
    });
  });
});
