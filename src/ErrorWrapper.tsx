import React, { useEffect, useState } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

import App from './App'
import ErrorScreen from './components/error/Error'

const globalErrorHandler = (error: Error) => {
  // Do something with the error
  // E.g. log to an error logging client here
  console.error(error.message)
}

const ErrorFallback = ({
  error,
  componentStack
}: {
  error?: Error
  componentStack?: string
}) => <ErrorScreen errorObj={error} componentStack={componentStack} />

const GlobalErrorWrapper = () => {
  const [globalError, setGlobalError] = useState({ state: false, message: '' })

  useEffect(() => {
    window.onerror = message => {
      console.info(`Caught Error from Worker ${message}`)
      setGlobalError({ state: true, message: message as string })
    }
  }, [])

  if (globalError.state) {
    return <ErrorScreen errorObj={new Error(globalError.message)} />
  }

  return (
    <>
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onError={globalErrorHandler}>
        <App />
      </ErrorBoundary>
    </>
  )
}

export default GlobalErrorWrapper
