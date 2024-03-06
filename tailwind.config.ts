import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme' // eslint-disable-line

export default <Partial<Config>>{
  theme: {
    extend: {
      aspectRatio: {
        auto: 'auto',
        square: '1 / 1',
        video: '16 / 9',
      },
      colors: {
        gold: {
          '50': '#fbf9f1',
          '100': '#f6f1de',
          '200': '#ebdfbd',
          '300': '#dec793',
          '400': '#d2ae6d',
          '500': '#c69449',
          '600': '#b8803e',
          '700': '#996535',
          '800': '#7b5131',
          '900': '#64442a',
          '950': '#362314',
        },
      },
    },
  },
}
