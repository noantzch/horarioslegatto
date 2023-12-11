import { authMiddleware } from "@clerk/nextjs";
 
// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware
export default authMiddleware({
  ignoredRoutes:['/public'],
  publicRoutes: ["/api/disponibilidad", "/api/clases", "/api/clasespasadas", "/api/confirmarAsistencia", "/api/profesores", "/api/asistencia", "/api/asignar", "/api/alumno", "/api/confirmarAsistencia"]
 
});
 
export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
 