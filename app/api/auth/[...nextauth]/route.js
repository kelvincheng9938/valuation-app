// app/api/auth/[...nextauth]/route.js
export const { GET, POST } = (await import('@/auth')).handlers;
