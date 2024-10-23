/**
 * Publicly accessible routes in the application.
 * These routes do not require authentication.
 * 
 * @type {string[]}
 */
export const publicRoutes = [
	'/',
];

/**
 * Routes related to authentication.
 * These routes will redirect logged in users to /settings.
 * 
 * @type {string[]}
 */
export const authRoutes = [
	'/auth/login',
	'/auth/register',
	'/auth/error',
];

/**
 * Prefix for authentication-related API endpoints.
 * This is used as the base path for auth API routes.
 * 
 * @type {string}
 */
export const apiAuthPrefix = '/api/auth';

/**
 * Default redirect path after a successful login.
 * Users will be redirected to this path upon logging in.
 * 
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = '/settings';