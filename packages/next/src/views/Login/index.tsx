import { Logo } from '@payloadcms/ui'
import { redirect } from 'next/navigation'
import React, { Fragment } from 'react'

import type { AdminViewProps } from '../Root'

import { LoginForm } from './LoginForm'
import './index.scss'

export { generateLoginMetadata } from './meta'

export const loginBaseClass = 'login'

export const Login: React.FC<AdminViewProps> = ({ initPageResult, searchParams }) => {
  const { req } = initPageResult

  const {
    payload: { config },
    user,
  } = req

  const {
    admin: { components: { afterLogin, beforeLogin } = {}, user: userSlug },
    collections,
    routes: { admin },
  } = config

  if (user) {
    redirect(admin)
  }

  const collectionConfig = collections.find(({ slug }) => slug === userSlug)

  return (
    <Fragment>
      <div className={`${loginBaseClass}__brand`}>
        <Logo config={config} />
      </div>
      {Array.isArray(beforeLogin) && beforeLogin.map((Component, i) => <Component key={i} />)}
      {!collectionConfig?.auth?.disableLocalStrategy && <LoginForm searchParams={searchParams} />}
      {Array.isArray(afterLogin) && afterLogin.map((Component, i) => <Component key={i} />)}
    </Fragment>
  )
}
