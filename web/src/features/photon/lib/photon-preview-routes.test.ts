/*
Copyright (C) 2023-2026 QuantumNous

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.
*/
import assert from 'node:assert/strict'
import test from 'node:test'

import { PHOTON_PREVIEW_ROUTES } from './photon-preview-routes.ts'

test('Photon uses isolated preview routes', () => {
  assert.deepEqual(PHOTON_PREVIEW_ROUTES, {
    home: '/photon',
    pricing: '/photon/pricing',
  })
})

test('Photon preview does not replace official routes', () => {
  const routes: string[] = Object.values(PHOTON_PREVIEW_ROUTES)
  assert.equal(routes.includes('/'), false)
  assert.equal(routes.includes('/pricing'), false)
})
