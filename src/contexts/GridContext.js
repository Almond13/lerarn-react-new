import React, { createContext, useContext, useState } from 'react'

const GridContext = createContext()

export const GridProvider = ({ children }) => {
  const [gridX, setGridX] = useState('60')
  const [gridY, setGridY] = useState('127')

  return (
    <GridContext.Provider value={{ gridX, setGridX, gridY, setGridY }}>
      {children}
    </GridContext.Provider>
  )
}

export const useGrid = () => {
  const context = useContext(GridContext)
  if (!context) {
    throw new Error('useGrid should be used within a GridProvider')
  }
  return context
}
