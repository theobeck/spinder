/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import FavoritesSongItem from "../components/FavoriteSongItem";
import '@testing-library/jest-dom'

describe('FavoriteSongItem Component', () => {
    const mockOnUnlike = jest.fn();

    const defaultProps = {
        albumCover: 'test-album-cover.jpg',
        title: 'Test Song Title',
        artist: 'Test Artist',
        songId: '12345',
        onUnlike: mockOnUnlike,
    };

    beforeEach(() => {
        render(
            <Router>
                <FavoritesSongItem {...defaultProps} />
            </Router>
        );
    });

    test('should render correctly (snapshot test)', () => {
        const tree = render(
            <Router>
                <FavoritesSongItem {...defaultProps} />
            </Router>
        );
        expect(tree).toMatchSnapshot();
    });
    test('should render album cover image with correct src and alt attributes', () => {
        const imgElement = screen.getByRole('img', { name: /song 1/i });
        expect(imgElement).toBeInTheDocument();
        expect(imgElement).toHaveAttribute('src', defaultProps.albumCover);
        expect(imgElement).toHaveAttribute('alt', 'Song 1');
    });

    test('should render correct song title', () => {
        expect(screen.getByText(defaultProps.title)).toBeInTheDocument();
    });

    test('should render correct artist name', () => {
        expect(screen.getByText(defaultProps.artist)).toBeInTheDocument();
    });

    test('should render unlike button and call onUnlike prop when clicked', () => {
        const unlikeButton = screen.getByRole('button', { name: /🗙/i });
        expect(unlikeButton).toBeInTheDocument();

        fireEvent.click(unlikeButton);
        expect(mockOnUnlike).toHaveBeenCalled();
    });

    test('should render link with correct href', () => {
        const linkElement = screen.getByRole('link');
        expect(linkElement).toHaveAttribute('href', `/track/${defaultProps.songId}`);
    });
});
