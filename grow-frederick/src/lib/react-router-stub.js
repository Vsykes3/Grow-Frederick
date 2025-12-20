// Stub for react-router-dom to prevent build errors
// These are legacy React Router components that shouldn't be used in Next.js Pages Router

// Minimal stubs that won't cause build errors
export const BrowserRouter = ({ children }) => children || null;
export const Routes = ({ children }) => children || null;
export const Route = () => null;
export const Link = ({ to, children, ...props }) => {
  // Return a simple anchor tag for build compatibility
  const href = typeof to === 'string' ? to : '#';
  return typeof window !== 'undefined' ? (
    <a href={href} {...props}>{children}</a>
  ) : null;
};
export const useNavigate = () => () => {};
export const useLocation = () => ({ pathname: '/' });
export const useParams = () => ({});
export const Navigate = () => null;

