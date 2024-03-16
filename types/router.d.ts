/* eslint-disable */
/* prettier-ignore */
// @ts-nocheck
// Generated by unplugin-vue-router. ‼️ DO NOT MODIFY THIS FILE ‼️
// It's recommended to commit this file.
// Make sure to add this file to your tsconfig.json file as an "includes" or "files" entry.

declare module 'vue-router/auto-routes' {
  import type {
    RouteRecordInfo,
    ParamValue,
    ParamValueOneOrMore,
    ParamValueZeroOrMore,
    ParamValueZeroOrOne,
  } from 'unplugin-vue-router/types'

  /**
   * Route name map generated by unplugin-vue-router
   */
  export interface RouteNamedMap {
    '/': RouteRecordInfo<'/', '/', Record<never, never>, Record<never, never>>,
    '/[...all]': RouteRecordInfo<'/[...all]', '/:all(.*)', { all: ParamValue<true> }, { all: ParamValue<false> }>,
    '/auction': RouteRecordInfo<'/auction', '/auction', Record<never, never>, Record<never, never>>,
    '/auction/premium': RouteRecordInfo<'/auction/premium', '/auction/premium', Record<never, never>, Record<never, never>>,
    '/auction/usernames': RouteRecordInfo<'/auction/usernames', '/auction/usernames', Record<never, never>, Record<never, never>>,
    'username': RouteRecordInfo<'username', '/auction/usernames/:name', { name: ParamValue<true> }, { name: ParamValue<false> }>,
  }
}
