/**
 * @jest-environment jsdom
 */

import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import React from 'react';
import PlayPageSong from "../components/SongDisplay"; // for the "toBeInTheDocument" matcher

describe('PlayPageSong Component', () => {
    const mockOnRate = jest.fn();

    const defaultProps = {
        albumCover: 'test-album-cover.jpg',
        title: 'Test Song Title',
        artist: 'Test Artist',
        onRate: mockOnRate,
    };

    beforeEach(() => {
        render(
            <PlayPageSong {...defaultProps} />
        );
    });

    test('should render album cover image with correct src and alt attributes', () => {
        const imgElement = screen.getByAltText('Søt liten guttelutt');
        expect(imgElement).toBeInTheDocument();
        expect(imgElement).toHaveAttribute('src', defaultProps.albumCover);
    });

    test('should render correct song title', () => {
        expect(screen.getByText(defaultProps.title)).toBeInTheDocument();
    });

    test('should render correct artist name', () => {
        expect(screen.getByText(defaultProps.artist)).toBeInTheDocument();
    });

    test('should call onRate with false when dislike button is clicked', () => {
        const dislikeButton = screen.getByAltText('X');
        fireEvent.click(dislikeButton.parentElement!);
        expect(mockOnRate).toHaveBeenCalledWith(false);
    });

    test('should call onRate with true when like button is clicked', () => {
        const likeButton = screen.getByAltText('<3');
        fireEvent.click(likeButton.parentElement!);
        expect(mockOnRate).toHaveBeenCalledWith(true);
    });
});
