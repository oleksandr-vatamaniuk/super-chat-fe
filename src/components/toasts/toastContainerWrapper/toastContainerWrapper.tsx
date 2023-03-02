import { ReactPortal } from '../../utils/portal/portal'
import React from 'react'
import { ToastContainer } from 'react-bootstrap'

const ToastContainerWrapper = ({ children }: { children: JSX.Element }) => {
  return (
    <ReactPortal wrapperId={'toast'}>
      <ToastContainer position="top-end">{children}</ToastContainer>
    </ReactPortal>
  )
}

export default ToastContainerWrapper
