import { computed } from 'vue'
import type { ComputedRef } from 'vue'
import * as Plot from '@observablehq/plot'

export interface GradientStop {
  offset: string // e.g., "15%", "50%", "100%"
  color: string // Any CSS color
}

export interface GradientConfig {
  id: string
  type?: 'linear' | 'radial'
  rotation?: number // Degrees (for linear gradient)
  stops: GradientStop[]
}

export interface GradientBarChartData {
  [key: string]: any
}

export interface GradientBarChartConfig {
  data: GradientBarChartData[]
  x: string
  y: string
  gradient: GradientConfig
  width?: number
  height?: number
  marginLeft?: number
  marginRight?: number
  marginTop?: number
  marginBottom?: number
  title?: string
  xLabel?: string
  yLabel?: string
  showGrid?: boolean
  sort?: boolean
}

/**
 * Composable for creating bar charts with SVG gradient fills
 * Uses custom mark functions to inject SVG defs
 * @param config - Configuration for the gradient bar chart
 * @returns Computed configuration for PlotChart component
 */
export function useGradientBarChart(config: GradientBarChartConfig): ComputedRef<any> {
  return computed(() => {
    const {
      data,
      x,
      y,
      gradient,
      width = 640,
      height = 400,
      marginLeft = 60,
      marginRight = 20,
      marginTop = 20,
      marginBottom = 60,
      title,
      xLabel,
      yLabel,
      showGrid = true,
      sort = false,
    } = config

    // Create gradient definition function
    const gradientDef = () => {
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'defs')
      
      let gradientEl: SVGLinearGradientElement | SVGRadialGradientElement
      
      if (gradient.type === 'radial') {
        gradientEl = document.createElementNS('http://www.w3.org/2000/svg', 'radialGradient')
      } else {
        gradientEl = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient')
        if (gradient.rotation !== undefined) {
          gradientEl.setAttribute('gradientTransform', `rotate(${gradient.rotation})`)
        }
      }
      
      gradientEl.setAttribute('id', gradient.id)
      
      // Add color stops
      gradient.stops.forEach(stop => {
        const stopEl = document.createElementNS('http://www.w3.org/2000/svg', 'stop')
        stopEl.setAttribute('offset', stop.offset)
        stopEl.setAttribute('stop-color', stop.color)
        gradientEl.appendChild(stopEl)
      })
      
      svg.appendChild(gradientEl)
      return svg
    }

    const marks: any[] = [
      gradientDef,
      Plot.barY(data, {
        x,
        y,
        fill: `url(#${gradient.id})`,
        tip: true,
        sort: sort ? { x: 'y', reverse: true } : undefined,
      }),
      Plot.ruleY([0]),
    ]

    return {
      width,
      height,
      marginLeft,
      marginRight,
      marginTop,
      marginBottom,
      marks,
      x: {
        label: xLabel || x,
      },
      y: {
        label: yLabel || y,
        grid: showGrid,
      },
      ...(title && { title }),
    }
  })
}

/**
 * Composable for creating multiple gradient bars (one per category)
 * Each bar can have its own gradient
 * @param config - Configuration for multi-gradient bar chart
 * @returns Computed configuration for PlotChart component
 */
export function useMultiGradientBarChart(
  config: Omit<GradientBarChartConfig, 'gradient'> & {
    categoryField: string
    gradients: Record<string, GradientConfig>
  }
): ComputedRef<any> {
  return computed(() => {
    const {
      data,
      x,
      y,
      categoryField,
      gradients,
      width = 640,
      height = 400,
      marginLeft = 60,
      marginRight = 20,
      marginTop = 20,
      marginBottom = 60,
      title,
      xLabel,
      yLabel,
      showGrid = true,
      sort = false,
    } = config

    // Create gradient definitions for all gradients
    const gradientDefs = () => {
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'defs')
      
      Object.values(gradients).forEach(gradient => {
        let gradientEl: SVGLinearGradientElement | SVGRadialGradientElement
        
        if (gradient.type === 'radial') {
          gradientEl = document.createElementNS('http://www.w3.org/2000/svg', 'radialGradient')
        } else {
          gradientEl = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient')
          if (gradient.rotation !== undefined) {
            gradientEl.setAttribute('gradientTransform', `rotate(${gradient.rotation})`)
          }
        }
        
        gradientEl.setAttribute('id', gradient.id)
        
        gradient.stops.forEach(stop => {
          const stopEl = document.createElementNS('http://www.w3.org/2000/svg', 'stop')
          stopEl.setAttribute('offset', stop.offset)
          stopEl.setAttribute('stop-color', stop.color)
          gradientEl.appendChild(stopEl)
        })
        
        svg.appendChild(gradientEl)
      })
      
      return svg
    }

    const marks: any[] = [
      gradientDefs,
      Plot.barY(data, {
        x,
        y,
        fill: (d: any) => `url(#${gradients[d[categoryField]]?.id || 'default'})`,
        tip: true,
        sort: sort ? { x: 'y', reverse: true } : undefined,
      }),
      Plot.ruleY([0]),
    ]

    return {
      width,
      height,
      marginLeft,
      marginRight,
      marginTop,
      marginBottom,
      marks,
      x: {
        label: xLabel || x,
      },
      y: {
        label: yLabel || y,
        grid: showGrid,
      },
      ...(title && { title }),
    }
  })
}

/**
 * Preset gradient configurations
 */
export const gradientPresets = {
  // Vertical gradients (bottom to top)
  sunset: {
    id: 'sunset-gradient',
    rotation: 90,
    stops: [
      { offset: '0%', color: '#ff6b6b' },
      { offset: '50%', color: '#feca57' },
      { offset: '100%', color: '#ee5a6f' },
    ],
  },
  ocean: {
    id: 'ocean-gradient',
    rotation: 90,
    stops: [
      { offset: '0%', color: '#667eea' },
      { offset: '100%', color: '#764ba2' },
    ],
  },
  forest: {
    id: 'forest-gradient',
    rotation: 90,
    stops: [
      { offset: '0%', color: '#56ab2f' },
      { offset: '100%', color: '#a8e063' },
    ],
  },
  fire: {
    id: 'fire-gradient',
    rotation: 90,
    stops: [
      { offset: '0%', color: '#f12711' },
      { offset: '100%', color: '#f5af19' },
    ],
  },
  purple: {
    id: 'purple-gradient',
    rotation: 90,
    stops: [
      { offset: '15%', color: 'purple' },
      { offset: '75%', color: 'red' },
      { offset: '100%', color: 'gold' },
    ],
  },
  rainbow: {
    id: 'rainbow-gradient',
    rotation: 90,
    stops: [
      { offset: '0%', color: '#ff0000' },
      { offset: '16.67%', color: '#ff7f00' },
      { offset: '33.33%', color: '#ffff00' },
      { offset: '50%', color: '#00ff00' },
      { offset: '66.67%', color: '#0000ff' },
      { offset: '83.33%', color: '#4b0082' },
      { offset: '100%', color: '#9400d3' },
    ],
  },
  cool: {
    id: 'cool-gradient',
    rotation: 90,
    stops: [
      { offset: '0%', color: '#2196f3' },
      { offset: '100%', color: '#21cbf3' },
    ],
  },
  warm: {
    id: 'warm-gradient',
    rotation: 90,
    stops: [
      { offset: '0%', color: '#f2709c' },
      { offset: '100%', color: '#ff9472' },
    ],
  },
  // Radial gradients
  radialSunset: {
    id: 'radial-sunset',
    type: 'radial' as const,
    stops: [
      { offset: '0%', color: '#feca57' },
      { offset: '100%', color: '#ff6b6b' },
    ],
  },
  radialOcean: {
    id: 'radial-ocean',
    type: 'radial' as const,
    stops: [
      { offset: '0%', color: '#667eea' },
      { offset: '100%', color: '#764ba2' },
    ],
  },
}

/**
 * Create a custom gradient configuration
 */
export function createGradient(
  id: string,
  colors: string[],
  options: { rotation?: number; type?: 'linear' | 'radial' } = {}
): GradientConfig {
  const stops: GradientStop[] = colors.map((color, index) => ({
    offset: `${(index / (colors.length - 1)) * 100}%`,
    color,
  }))

  return {
    id,
    type: options.type || 'linear',
    rotation: options.rotation,
    stops,
  }
}
