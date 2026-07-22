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
import { useTranslation } from 'react-i18next'

import { PublicHeader } from './public-header'

export function PhotonPublicLayout(props: { children: React.ReactNode }) {
  const { t } = useTranslation()

  return (
    <div className='dark min-h-svh overflow-x-clip bg-[#13111C] text-[#e0dcf0] [color-scheme:dark] [--accent:#25213a] [--background:#13111C] [--border:#312c48] [--card-foreground:#e0dcf0] [--card:#1a1a2e] [--foreground:#e0dcf0] [--input:#3a3550] [--muted-foreground:#9e98b8] [--muted:#25213a] [--popover-foreground:#e0dcf0] [--popover:#1a1a2e] [--primary-foreground:#ffffff] [--primary:#7F77DD]'>
      <PublicHeader
        className='border-[#7F77DD]/15 bg-[#13111C]/90 text-[#e0dcf0] backdrop-blur-xl'
        homeUrl='/photon'
        showThemeSwitch={false}
      />
      <div className='pt-16'>{props.children}</div>
      <footer className='border-t border-[#7F77DD]/15 bg-[#0f0f1a] px-6 py-8 text-sm text-[#6a6580]'>
        <div className='mx-auto flex max-w-[1440px] flex-col justify-between gap-3 sm:flex-row'>
          <span>© TokenPowerHub · {t('Token Computing Center')}</span>
          <span>{t('Clear, reliable, and engineered for action.')}</span>
        </div>
      </footer>
    </div>
  )
}
