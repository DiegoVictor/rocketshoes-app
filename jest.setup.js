jest.mock('react-navigation', () => ({
  NavigationActions: {
    navigate: jest.fn(),
  },
}));
