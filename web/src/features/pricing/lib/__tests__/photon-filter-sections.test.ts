/*
Copyright (C) 2023-2026 QuantumNous

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.
*/
import assert from 'node:assert/strict'
import test from 'node:test'

import { PHOTON_FILTER_SECTIONS } from '../photon-filter-sections.ts'

test('Photon filters show vendor, group, then model tags', () => {
  assert.deepEqual(PHOTON_FILTER_SECTIONS, ['vendor', 'group', 'tag'])
})

test('Photon filters hide pricing and endpoint types', () => {
  assert.equal(PHOTON_FILTER_SECTIONS.includes('quota'), false)
  assert.equal(PHOTON_FILTER_SECTIONS.includes('endpoint'), false)
})
