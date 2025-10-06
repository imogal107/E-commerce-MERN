import React from "react"
import PageRoutes from "./routing/PageRoutes.jsx"
import AuthProvider from "./components/AuthProvider.jsx"

function App() {
  return (
    <AuthProvider>
      <PageRoutes/>
    </AuthProvider>
  )
}

export default App
