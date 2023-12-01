export async function getId(clerk_user:string | null) {
    try {
      const response = await fetch(`/api/profesores?clerk_user=${clerk_user}`);
  
      if (!response.ok) {
        throw new Error('Error al obtener datos del servidor');
      }
  
      const data = await response.json();
      return data.profesor[0].id
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
  
