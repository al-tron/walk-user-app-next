import { customRipple } from 'use-ripple-hook'

const LOGO_COLOR = '255, 250, 255'
const STONE_COLOR = '120, 113, 108'

export const useDarkBgRipple = customRipple({ color: `rgba(${LOGO_COLOR}, .15)` })
export const useLightBgRipple = customRipple({ color: `rgba(${STONE_COLOR}, .2)` })

export const useDarkBgSubtleRipple = customRipple({ color: `rgba(${LOGO_COLOR}, .1)` })
export const useLightBgSubtleRipple = customRipple({ color: `rgba(${STONE_COLOR}, .15)` })
