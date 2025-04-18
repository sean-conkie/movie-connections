'use client'

import { useRouter } from 'next/navigation'
import React from 'react'
import Spinner, { SpinnerProps } from './Spinner'

type Props = React.PropsWithChildren<React.ComponentProps<'button'> & {
  href?: string
  loading?: boolean
  loadingText?: string
  spinner?: SpinnerProps['spinner']
  spinnerSize?: SpinnerProps['spinnerSize']
}>

const Button = (props: Props) => {

  const router = useRouter()

  const { children, className, href, type, loading, loadingText, spinner, spinnerSize, ...remainingProps } = props
  const baseClassName = ['btn', 'btn-spinner', 'w-fit']

  if (loading) baseClassName.push('btn-loading')

  const uniqueClassName = [...new Set([...baseClassName, ...className?.split(' ')??[]])]
  const onClick = href ? () => router.push(href) : remainingProps.onClick

  return (
    <button
      className={uniqueClassName.join(' ')}
      onClick={onClick}
      type={type || 'button'}
      disabled={loading}
      {...remainingProps}
      >
        <div className='btn-loading-spinner'>
          <Spinner spinner={spinner} spinnerSize={spinnerSize} label={loadingText} />
        </div>
        <div className='flex flex-row gap-2 btn-content items-center'>{ children }</div>
      </button>
  )
}

export default Button