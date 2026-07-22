/*
Copyright (C) 2023-2026 QuantumNous

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.
*/
import { Grid2X2, Table2 } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { PhotonPublicLayout } from '@/components/layout/components/photon-public-layout'
import { PageTransition } from '@/components/page-transition'
import { Button } from '@/components/ui/button'
import {
  EmptyState,
  LoadingSkeleton,
  ModelCardGrid,
  ModelDetailsDrawer,
  PricingTable,
  SearchBar,
} from '@/features/pricing/components'
import {
  ENDPOINT_TYPES,
  EXCLUDED_GROUPS,
  FILTER_ALL,
  QUOTA_TYPES,
  SORT_OPTIONS,
  VIEW_MODES,
  getSortLabels,
  type ViewMode,
} from '@/features/pricing/constants'
import { usePricingData } from '@/features/pricing/hooks/use-pricing-data'
import {
  extractAllTags,
  filterAndSortModels,
} from '@/features/pricing/lib/filters'
import type { TokenUnit } from '@/features/pricing/types'
import { cn } from '@/lib/utils'

type FilterSectionProps = {
  title: string
  value: string
  options: Array<{ label: string; value: string }>
  onChange: (value: string) => void
}

function PhotonFilterSection(props: FilterSectionProps) {
  return (
    <section className='border-b border-[#312c48] pb-5 last:border-0'>
      <h2 className='mb-3 font-mono text-[11px] tracking-[0.16em] text-[#9e98b8] uppercase'>
        {props.title}
      </h2>
      <div className='flex flex-wrap gap-2'>
        {props.options.map((option) => (
          <button
            key={option.value}
            type='button'
            onClick={() => props.onChange(option.value)}
            className={cn(
              'max-w-full truncate rounded-lg border px-2.5 py-1.5 text-xs transition',
              props.value === option.value
                ? 'border-[#7F77DD] bg-[#7F77DD]/15 text-[#e0dcf0]'
                : 'border-[#312c48] bg-[#13111C] text-[#9e98b8] hover:border-[#7F77DD]/60 hover:text-[#e0dcf0]'
            )}
          >
            {option.label}
          </button>
        ))}
      </div>
    </section>
  )
}

export function PhotonPricing() {
  const { t } = useTranslation()
  const pricing = usePricingData()
  const [search, setSearch] = useState('')
  const [vendor, setVendor] = useState(FILTER_ALL)
  const [group, setGroup] = useState(FILTER_ALL)
  const [tag, setTag] = useState(FILTER_ALL)
  const [sortBy, setSortBy] = useState<string>(SORT_OPTIONS.NAME)
  const [tokenUnit, setTokenUnit] = useState<TokenUnit>('M')
  const [viewMode, setViewMode] = useState<ViewMode>(VIEW_MODES.CARD)
  const [showRechargePrice, setShowRechargePrice] = useState(false)
  const [selectedModelName, setSelectedModelName] = useState<string | null>(
    null
  )

  const groups = useMemo(
    () =>
      Object.keys(pricing.usableGroup).filter(
        (item) => !EXCLUDED_GROUPS.includes(item)
      ),
    [pricing.usableGroup]
  )
  const tags = useMemo(() => extractAllTags(pricing.models), [pricing.models])
  const filteredModels = useMemo(
    () =>
      filterAndSortModels(pricing.models, {
        search,
        vendor,
        group,
        tag,
        sortBy,
        quotaType: QUOTA_TYPES.ALL,
        endpointType: ENDPOINT_TYPES.ALL,
      }),
    [group, pricing.models, search, sortBy, tag, vendor]
  )
  const selectedModel = useMemo(
    () =>
      pricing.models.find((model) => model.model_name === selectedModelName) ??
      null,
    [pricing.models, selectedModelName]
  )
  const hasFilters =
    vendor !== FILTER_ALL || group !== FILTER_ALL || tag !== FILTER_ALL
  const clearFilters = () => {
    setVendor(FILTER_ALL)
    setGroup(FILTER_ALL)
    setTag(FILTER_ALL)
  }

  if (pricing.isLoading) {
    return (
      <PhotonPublicLayout>
        <div className='mx-auto w-full max-w-[1800px] px-3 py-10 sm:px-6 xl:px-8'>
          <LoadingSkeleton viewMode={viewMode} />
        </div>
      </PhotonPublicLayout>
    )
  }

  let pricingContent = (
    <PricingTable
      models={filteredModels}
      onModelClick={setSelectedModelName}
      priceRate={pricing.priceRate}
      usdExchangeRate={pricing.usdExchangeRate}
      tokenUnit={tokenUnit}
      showRechargePrice={showRechargePrice}
      selectedGroup={group}
    />
  )
  if (viewMode === VIEW_MODES.CARD) {
    pricingContent = (
      <ModelCardGrid
        models={filteredModels}
        onModelClick={setSelectedModelName}
        priceRate={pricing.priceRate}
        usdExchangeRate={pricing.usdExchangeRate}
        tokenUnit={tokenUnit}
        showRechargePrice={showRechargePrice}
        selectedGroup={group}
      />
    )
  }
  if (filteredModels.length === 0) {
    pricingContent = (
      <EmptyState
        searchQuery={search}
        hasActiveFilters={hasFilters}
        onClearFilters={clearFilters}
      />
    )
  }

  return (
    <PhotonPublicLayout>
      <div className='relative overflow-hidden'>
        <div
          aria-hidden='true'
          className='pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(circle_at_18%_0%,rgba(127,119,221,0.18),transparent_38%),radial-gradient(circle_at_82%_12%,rgba(93,202,165,0.09),transparent_32%)]'
        />
        <PageTransition className='relative mx-auto w-full max-w-[1800px] px-3 py-8 sm:px-6 sm:py-12 xl:px-8'>
          <header className='mb-8 grid gap-6 border-b border-[#2b2740] pb-8 lg:grid-cols-[minmax(0,1fr)_minmax(360px,620px)] lg:items-end'>
            <div>
              <p className='mb-3 font-mono text-xs tracking-[0.24em] text-[#5DCAA5] uppercase'>
                {t('Model routing directory')}
              </p>
              <h1 className='max-w-3xl text-[clamp(2.2rem,5vw,4.5rem)] leading-[0.98] font-semibold tracking-[-0.045em] text-[#e0dcf0]'>
                {t('One gateway. Every model that matters.')}
              </h1>
            </div>
            <div>
              <div className='mb-3 flex justify-between font-mono text-xs text-[#9e98b8]'>
                <span>
                  {t('{{count}} models online', {
                    count: pricing.models.length,
                  })}
                </span>
                <span className='text-[#5DCAA5]'>● {t('Live catalog')}</span>
              </div>
              <SearchBar
                value={search}
                onChange={setSearch}
                onClear={() => setSearch('')}
                placeholder={t(
                  'Search model name, provider, endpoint, or tag...'
                )}
                className='border-[#3a3550] bg-[#1a1a2e]/90'
              />
            </div>
          </header>

          <div className='grid gap-4 xl:grid-cols-[300px_minmax(0,1fr)]'>
            <aside className='space-y-5 rounded-lg border border-[#312c48] bg-[#1a1a2e]/80 p-4 xl:sticky xl:top-4 xl:max-h-[calc(100dvh-2rem)] xl:self-start xl:overflow-y-auto'>
              <div className='flex items-center justify-between'>
                <strong>{t('Filter')}</strong>
                <Button
                  variant='ghost'
                  size='sm'
                  disabled={!hasFilters}
                  onClick={clearFilters}
                >
                  {t('Reset')}
                </Button>
              </div>
              <PhotonFilterSection
                title={t('Providers')}
                value={vendor}
                onChange={setVendor}
                options={[
                  { value: FILTER_ALL, label: t('All Vendors') },
                  ...pricing.vendors.map((item) => ({
                    value: item.name,
                    label: item.name,
                  })),
                ]}
              />
              <PhotonFilterSection
                title={t('Groups')}
                value={group}
                onChange={setGroup}
                options={[
                  { value: FILTER_ALL, label: t('All Groups') },
                  ...groups.map((item) => ({ value: item, label: item })),
                ]}
              />
              <PhotonFilterSection
                title={t('Model Tags')}
                value={tag}
                onChange={setTag}
                options={[
                  { value: FILTER_ALL, label: t('All Tags') },
                  ...tags.map((item) => ({ value: item, label: item })),
                ]}
              />
            </aside>

            <main className='min-w-0 space-y-4'>
              <div className='flex flex-wrap items-center justify-between gap-3 rounded-lg border border-[#312c48] bg-[#1a1a2e]/80 p-3'>
                <span className='text-sm text-[#9e98b8]'>
                  <strong className='text-[#e0dcf0]'>
                    {filteredModels.length}
                  </strong>{' '}
                  {t('models')}
                </span>
                <div className='flex flex-wrap gap-2'>
                  <select
                    value={sortBy}
                    onChange={(event) => setSortBy(event.target.value)}
                    className='h-9 rounded-lg border border-[#312c48] bg-[#13111C] px-3 text-xs'
                  >
                    {Object.entries(getSortLabels(t)).map(([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                  <Button
                    size='sm'
                    variant={showRechargePrice ? 'outline' : 'default'}
                    onClick={() => setShowRechargePrice(false)}
                  >
                    {t('Standard')}
                  </Button>
                  <Button
                    size='sm'
                    variant={showRechargePrice ? 'default' : 'outline'}
                    onClick={() => setShowRechargePrice(true)}
                  >
                    {t('Recharge')}
                  </Button>
                  <Button
                    size='sm'
                    variant={tokenUnit === 'M' ? 'default' : 'outline'}
                    onClick={() => setTokenUnit('M')}
                  >
                    /1M
                  </Button>
                  <Button
                    size='sm'
                    variant={tokenUnit === 'K' ? 'default' : 'outline'}
                    onClick={() => setTokenUnit('K')}
                  >
                    /1K
                  </Button>
                  <Button
                    size='icon-sm'
                    variant={
                      viewMode === VIEW_MODES.CARD ? 'default' : 'outline'
                    }
                    onClick={() => setViewMode(VIEW_MODES.CARD)}
                    aria-label={t('Card view')}
                  >
                    <Grid2X2 />
                  </Button>
                  <Button
                    size='icon-sm'
                    variant={
                      viewMode === VIEW_MODES.TABLE ? 'default' : 'outline'
                    }
                    onClick={() => setViewMode(VIEW_MODES.TABLE)}
                    aria-label={t('Table view')}
                  >
                    <Table2 />
                  </Button>
                </div>
              </div>

              {pricingContent}
            </main>
          </div>

          {selectedModel && (
            <ModelDetailsDrawer
              open
              onOpenChange={(open) => !open && setSelectedModelName(null)}
              model={selectedModel}
              groupRatio={pricing.groupRatio}
              usableGroup={pricing.usableGroup}
              endpointMap={
                pricing.endpointMap as Record<
                  string,
                  { path?: string; method?: string }
                >
              }
              autoGroups={pricing.autoGroups}
              priceRate={pricing.priceRate}
              usdExchangeRate={pricing.usdExchangeRate}
              tokenUnit={tokenUnit}
              showRechargePrice={showRechargePrice}
            />
          )}
        </PageTransition>
      </div>
    </PhotonPublicLayout>
  )
}
