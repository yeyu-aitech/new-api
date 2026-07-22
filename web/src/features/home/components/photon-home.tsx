/*
Copyright (C) 2023-2026 QuantumNous

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program. If not, see <https://www.gnu.org/licenses/>.

For commercial licensing, please contact support@quantumnous.com
*/
import { Link } from '@tanstack/react-router'
import { ArrowRight, BookOpen, KeyRound, LineChart, Search } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { PhotonPublicLayout } from '@/components/layout/components/photon-public-layout'
import { Button } from '@/components/ui/button'

import { HeroTerminalDemo } from './hero-terminal-demo'

const capabilities = [
  {
    title: 'Understand models',
    description:
      'Compare providers, pricing, endpoints, tags, and live performance in one catalog.',
    icon: Search,
  },
  {
    title: 'Estimate cost',
    description:
      'Read input, output, cache, request, and dynamic pricing with consistent units.',
    icon: LineChart,
  },
  {
    title: 'Connect compute',
    description:
      'Use one OpenAI-compatible entry point across common AI applications and workflows.',
    icon: KeyRound,
  },
  {
    title: 'Manage continuously',
    description:
      'Track API keys, quota, usage, and request records from the existing console.',
    icon: BookOpen,
  },
] as const

export function PhotonHome(props: { isAuthenticated: boolean }) {
  const { t } = useTranslation()

  return (
    <PhotonPublicLayout>
      <main>
        <section className='relative overflow-hidden px-6 pt-28 pb-20 md:pt-36 md:pb-28'>
          <div
            aria-hidden='true'
            className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_22%_12%,rgba(127,119,221,0.14),transparent_28%)]'
          />
          <div className='relative mx-auto grid max-w-6xl gap-14 lg:grid-cols-2 lg:items-center'>
            <div>
              <p className='font-mono text-xs tracking-[0.08em] text-[#5DCAA5] uppercase'>
                {t('Unified OpenAI-compatible AI gateway')}
              </p>
              <h1 className='mt-5 text-5xl leading-[1.05] font-semibold tracking-[-0.035em] md:text-6xl'>
                {t('Connect once,')}
                <br />
                <span className='text-[#9388EE]'>
                  {t('use models worldwide.')}
                </span>
              </h1>
              <p className='mt-6 max-w-xl text-base leading-8 text-[#9e98b8]'>
                {t(
                  'Bring providers, pricing rules, and access configuration into one place. Understand models, estimate cost, connect compute, and manage every request.'
                )}
              </p>
              <div className='mt-8 flex flex-wrap gap-3'>
                <Button
                  className='h-11 rounded-lg bg-[#7F77DD] px-5 text-white hover:bg-[#9388EE]'
                  render={<Link to='/photon/pricing' />}
                >
                  {t('View models and pricing')}
                  <ArrowRight className='ml-1.5 size-4' />
                </Button>
                <Button
                  variant='outline'
                  className='h-11 rounded-lg border-[#7F77DD]/30 bg-[#7F77DD]/5 px-5 text-[#e0dcf0] hover:bg-[#7F77DD]/10'
                  render={
                    <Link
                      to={props.isAuthenticated ? '/dashboard' : '/sign-in'}
                    />
                  }
                >
                  {t('Go to Dashboard')}
                </Button>
              </div>
            </div>
            <HeroTerminalDemo className='border-[#7F77DD]/20 bg-[#0f0f1a] shadow-[0_24px_70px_rgba(0,0,0,0.36)]' />
          </div>
        </section>

        <section className='border-y border-[#7F77DD]/15 bg-[#0f0f1a]/65 px-6'>
          <div className='mx-auto grid max-w-6xl grid-cols-2 md:grid-cols-4'>
            {[
              ['ONE API', 'Unified compatible entry'],
              ['LIVE', 'Pricing and status'],
              ['ROUTED', 'Providers and groups'],
              ['CONTROL', 'Keys and usage'],
            ].map(([value, label]) => (
              <div
                key={value}
                className='border-[#7F77DD]/10 px-4 py-7 md:border-r last:md:border-r-0'
              >
                <strong className='block font-mono text-xl text-[#e0dcf0]'>
                  {value}
                </strong>
                <span className='mt-1 block text-xs text-[#9e98b8]'>
                  {t(label)}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className='px-6 py-24'>
          <div className='mx-auto max-w-6xl'>
            <p className='font-mono text-xs text-[#7F77DD] uppercase'>
              {t('Token Computing Center')}
            </p>
            <h2 className='mt-4 text-3xl font-semibold tracking-tight md:text-4xl'>
              {t('From choosing a model to running it reliably.')}
            </h2>
            <div className='mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
              {capabilities.map((capability, index) => {
                const Icon = capability.icon
                return (
                  <article
                    key={capability.title}
                    className='rounded-lg border border-[#7F77DD]/15 bg-[#1a1a2e] p-6 transition hover:-translate-y-1 hover:border-[#7F77DD]/55'
                  >
                    <div className='flex items-center justify-between'>
                      <Icon className='size-5 text-[#5DCAA5]' />
                      <span className='font-mono text-xs text-[#6a6580]'>
                        0{index + 1}
                      </span>
                    </div>
                    <h3 className='mt-8 font-semibold'>
                      {t(capability.title)}
                    </h3>
                    <p className='mt-3 text-sm leading-6 text-[#9e98b8]'>
                      {t(capability.description)}
                    </p>
                  </article>
                )
              })}
            </div>
          </div>
        </section>

        <section className='bg-[#0f0f1a] px-6 py-24'>
          <div className='mx-auto max-w-6xl'>
            <p className='font-mono text-xs text-[#7F77DD] uppercase'>
              {t('Workflow')}
            </p>
            <h2 className='mt-4 text-3xl font-semibold tracking-tight md:text-4xl'>
              {t('Start calling in three steps.')}
            </h2>
            <div className='mt-10 grid gap-8 md:grid-cols-3'>
              {[
                ['01 · Select', 'View models and pricing'],
                ['02 · Connect', 'Create a key and configure your client'],
                ['03 · Manage', 'Track usage and cost in the console'],
              ].map(([step, title]) => (
                <article key={step} className='border-t border-[#7F77DD] pt-5'>
                  <span className='font-mono text-xs text-[#7F77DD]'>
                    {step}
                  </span>
                  <h3 className='mt-4 text-lg font-semibold'>{t(title)}</h3>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
    </PhotonPublicLayout>
  )
}
