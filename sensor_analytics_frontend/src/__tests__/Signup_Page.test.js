import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react'; 
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import SignupPage from '../SignupPage';

describe('Sign up page components', () => {
    test('Contains the input field to enter Name', () => {
        render(
          <MemoryRouter> {/* Wrap your component with MemoryRouter */}
          <SignupPage />
        </MemoryRouter>
            );
      const name = screen.getByPlaceholderText("NAME");
      expect(name).toBeInTheDocument();
    });
  
    test('Contains the input field to enter Username', () => {
      render(
        <MemoryRouter> {/* Wrap your component with MemoryRouter */}
        <SignupPage />
      </MemoryRouter>
    );
      const username = screen.getByPlaceholderText("USERNAME");
      expect(username).toBeInTheDocument();
    });
  
    test('Contains the button for signup', () => {
      render(
        <MemoryRouter> {/* Wrap your component with MemoryRouter */}
        <SignupPage />
      </MemoryRouter>
    );
      const signupButton = screen.getAllByText(/SIGN UP/i);
      expect(signupButton[0]).toBeInTheDocument();
    });
  });