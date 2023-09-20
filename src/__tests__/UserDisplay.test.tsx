/**
 * @jest-environment jsdom
 */

import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import React from 'react';
import { useQuery } from 'react-query';
import { SpotifyAPI } from '../utils/authentication.ts';
import UserDisplay from "../components/UserDisplay";

jest.mock('react-query', () => ({
    ...jest.requireActual('react-query'),
    useQuery: jest.fn(),
}));

jest.mock('../utils/authentication.ts', () => ({
    SpotifyAPI: {
        getAuthorization: jest.fn(),
    },
}));

describe('UserDisplay Component', () => {
    const mockLogout = jest.fn();
    const mockGetUser = jest.fn();
    const mockAuthorization = {
        logout: mockLogout,
        getUser: mockGetUser,
    };

    beforeEach(() => {
        (SpotifyAPI.getAuthorization as jest.Mock).mockReturnValue(mockAuthorization);
    });

    test('should render user data when userQuery has data', () => {
        (useQuery as jest.Mock).mockReturnValue({
            data: {
                display_name: 'Test User',
                images: [{ url: 'test-image-url.jpg' }],
            },
        });

        render(<UserDisplay />);

        expect(screen.getByText('Test User')).toBeInTheDocument();
        expect(screen.getByAltText('User')).toHaveAttribute('src', 'test-image-url.jpg');
    });

    test('should call logout function when logout button is clicked', () => {
        (useQuery as jest.Mock).mockReturnValue({
            data: {
                display_name: 'Test User',
                images: [{ url: 'test-image-url.jpg' }],
            },
        });

        render(<UserDisplay />);

        const logoutButton = screen.getByText('Logout');
        fireEvent.click(logoutButton);

        expect(mockLogout).toHaveBeenCalled();
    });

    test('should not render user data when userQuery has no data', () => {
        (useQuery as jest.Mock).mockReturnValue({ data: null });

        render(<UserDisplay />);

        expect(screen.queryByText('Logout')).not.toBeInTheDocument();
        expect(screen.queryByAltText('User')).not.toBeInTheDocument();
    });
});
