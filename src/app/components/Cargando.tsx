import React from 'react'

const Cargando = () => {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-white">
      <div className="animate-spin rounded-full border-t-4 border-orange-400 h-16 w-16"></div>
      <div className="ml-3">Cargando</div>
    </div>
  )
}

export default Cargando