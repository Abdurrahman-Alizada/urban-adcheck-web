import React, { Children } from 'react'
import Sidebar from './components/Sidebar/page'
function layout({ children }) {
  return (
    <div >
        <Sidebar/>
        {children}
    </div>
  )
}

export default layout
