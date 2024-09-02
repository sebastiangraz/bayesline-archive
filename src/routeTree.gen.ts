/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as BlogPostIdImport } from './routes/blog/$postId'

// Create Virtual Routes

const TosLazyImport = createFileRoute('/tos')()
const PrivacyLazyImport = createFileRoute('/privacy')()
const PricingLazyImport = createFileRoute('/pricing')()
const BrandLazyImport = createFileRoute('/brand')()
const AboutLazyImport = createFileRoute('/about')()
const IndexLazyImport = createFileRoute('/')()
const BlogIndexLazyImport = createFileRoute('/blog/')()

// Create/Update Routes

const TosLazyRoute = TosLazyImport.update({
  path: '/tos',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/tos.lazy').then((d) => d.Route))

const PrivacyLazyRoute = PrivacyLazyImport.update({
  path: '/privacy',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/privacy.lazy').then((d) => d.Route))

const PricingLazyRoute = PricingLazyImport.update({
  path: '/pricing',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/pricing.lazy').then((d) => d.Route))

const BrandLazyRoute = BrandLazyImport.update({
  path: '/brand',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/brand.lazy').then((d) => d.Route))

const AboutLazyRoute = AboutLazyImport.update({
  path: '/about',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/about.lazy').then((d) => d.Route))

const IndexLazyRoute = IndexLazyImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/index.lazy').then((d) => d.Route))

const BlogIndexLazyRoute = BlogIndexLazyImport.update({
  path: '/blog/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/blog/index.lazy').then((d) => d.Route))

const BlogPostIdRoute = BlogPostIdImport.update({
  path: '/blog/$postId',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/about': {
      id: '/about'
      path: '/about'
      fullPath: '/about'
      preLoaderRoute: typeof AboutLazyImport
      parentRoute: typeof rootRoute
    }
    '/brand': {
      id: '/brand'
      path: '/brand'
      fullPath: '/brand'
      preLoaderRoute: typeof BrandLazyImport
      parentRoute: typeof rootRoute
    }
    '/pricing': {
      id: '/pricing'
      path: '/pricing'
      fullPath: '/pricing'
      preLoaderRoute: typeof PricingLazyImport
      parentRoute: typeof rootRoute
    }
    '/privacy': {
      id: '/privacy'
      path: '/privacy'
      fullPath: '/privacy'
      preLoaderRoute: typeof PrivacyLazyImport
      parentRoute: typeof rootRoute
    }
    '/tos': {
      id: '/tos'
      path: '/tos'
      fullPath: '/tos'
      preLoaderRoute: typeof TosLazyImport
      parentRoute: typeof rootRoute
    }
    '/blog/$postId': {
      id: '/blog/$postId'
      path: '/blog/$postId'
      fullPath: '/blog/$postId'
      preLoaderRoute: typeof BlogPostIdImport
      parentRoute: typeof rootRoute
    }
    '/blog/': {
      id: '/blog/'
      path: '/blog'
      fullPath: '/blog'
      preLoaderRoute: typeof BlogIndexLazyImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({
  IndexLazyRoute,
  AboutLazyRoute,
  BrandLazyRoute,
  PricingLazyRoute,
  PrivacyLazyRoute,
  TosLazyRoute,
  BlogPostIdRoute,
  BlogIndexLazyRoute,
})

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/about",
        "/brand",
        "/pricing",
        "/privacy",
        "/tos",
        "/blog/$postId",
        "/blog/"
      ]
    },
    "/": {
      "filePath": "index.lazy.tsx"
    },
    "/about": {
      "filePath": "about.lazy.tsx"
    },
    "/brand": {
      "filePath": "brand.lazy.tsx"
    },
    "/pricing": {
      "filePath": "pricing.lazy.tsx"
    },
    "/privacy": {
      "filePath": "privacy.lazy.tsx"
    },
    "/tos": {
      "filePath": "tos.lazy.tsx"
    },
    "/blog/$postId": {
      "filePath": "blog/$postId.tsx"
    },
    "/blog/": {
      "filePath": "blog/index.lazy.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
