import { computed } from 'vue'
import type { ComputedRef } from 'vue'
import * as Plot from '@observablehq/plot'

export interface ScatterPlotData {
  [key: string]: any
}

export interface ScatterPlotConfig {
  data: ScatterPlotData[]
  x: string // X-axis field name
  y: string // Y-axis field name
  stroke?: string // Color field for categories
  symbol?: string // Shape field for categories (accessibility)
  fill?: string // Fill color field
  r?: string | number // Radius field or constant
  width?: number
  height?: number
  marginLeft?: number
  marginRight?: number
  marginTop?: number
  marginBottom?: number
  title?: string
  xLabel?: string
  yLabel?: string
  colors?: string[]
  symbols?: string[] // Custom symbol shapes
  showGrid?: boolean
  showTooltip?: boolean
  showLegend?: boolean
}

/**
 * Composable for creating scatter plot with symbol channel
 * Uses both color and shape encoding for accessibility
 * @param config - Configuration for the scatter plot
 * @returns Computed configuration for PlotChart component
 */
export function useScatterPlot(config: ScatterPlotConfig): ComputedRef<any> {
  return computed(() => {
    const {
      data,
      x,
      y,
      stroke,
      symbol,
      fill,
      r = 3,
      width = 640,
      height = 400,
      marginLeft = 60,
      marginRight = 20,
      marginTop = 20,
      marginBottom = 40,
      title,
      xLabel,
      yLabel,
      colors,
      symbols,
      showGrid = true,
      showTooltip = true,
      showLegend = true,
    } = config

    const dotOptions: any = {
      x,
      y,
    }

    // Add stroke (color) encoding
    if (stroke) {
      dotOptions.stroke = stroke
    }

    // Add symbol (shape) encoding for accessibility
    if (symbol) {
      dotOptions.symbol = symbol
    }

    // Add fill encoding
    if (fill) {
      dotOptions.fill = fill
    }

    // Add radius
    if (typeof r === 'string') {
      dotOptions.r = r
    } else {
      dotOptions.r = r
    }

    // Add tooltip
    if (showTooltip) {
      dotOptions.tip = true
      if (stroke || symbol || fill) {
        dotOptions.title = stroke || symbol || fill
      }
    }

    const marks: any[] = [Plot.dot(data, dotOptions)]

    const plotConfig: any = {
      width,
      height,
      marginLeft,
      marginRight,
      marginTop,
      marginBottom,
      marks,
      grid: showGrid,
      x: {
        label: xLabel || `${x} →`,
      },
      y: {
        label: yLabel || `↑ ${y}`,
      },
    }

    if (title) {
      plotConfig.title = title
    }

    // Add symbol legend (combines color and shape)
    if (showLegend && symbol) {
      plotConfig.symbol = {
        legend: true,
      }
    }

    // Add color legend if no symbol
    if (showLegend && stroke && !symbol) {
      plotConfig.color = {
        legend: true,
      }
    }

    // Add custom colors
    if (colors && stroke) {
      plotConfig.color = {
        ...plotConfig.color,
        range: colors,
      }
    }

    // Add custom symbols
    if (symbols && symbol) {
      plotConfig.symbol = {
        ...plotConfig.symbol,
        range: symbols,
      }
    }

    return plotConfig
  })
}

/**
 * Composable for creating accessible scatter plot
 * Uses redundant encoding: same field for both color and shape
 * Best for accessibility (color vision deficiency)
 * @param config - Configuration for the scatter plot
 * @returns Computed configuration for PlotChart component
 */
export function useAccessibleScatterPlot(
  config: Omit<ScatterPlotConfig, 'symbol'> & { category: string }
): ComputedRef<any> {
  return computed(() => {
    const { category, ...rest } = config

    return useScatterPlot({
      ...rest,
      stroke: category, // Use category for color
      symbol: category, // Use same category for shape (redundant encoding)
    }).value
  })
}

/**
 * Composable for creating bubble chart (sized dots)
 * @param config - Configuration for the bubble chart
 * @returns Computed configuration for PlotChart component
 */
export function useBubbleChart(
  config: ScatterPlotConfig & { size: string }
): ComputedRef<any> {
  return computed(() => {
    const { size, ...rest } = config

    return useScatterPlot({
      ...rest,
      r: size, // Use field for radius
    }).value
  })
}

/**
 * Available symbol shapes in Observable Plot
 */
export const plotSymbols = {
  // Basic shapes
  circle: 'circle',
  cross: 'cross',
  diamond: 'diamond',
  square: 'square',
  star: 'star',
  triangle: 'triangle',
  wye: 'wye',

  // Filled variants
  circleFill: 'circle-fill',
  crossFill: 'cross-fill',
  diamondFill: 'diamond-fill',
  squareFill: 'square-fill',
  starFill: 'star-fill',
  triangleFill: 'triangle-fill',
  wyeFill: 'wye-fill',

  // Directional triangles
  triangleUp: 'triangle',
  triangleDown: 'triangle2',
  triangleLeft: 'triangle3',
  triangleRight: 'triangle4',
}

/**
 * Preset color schemes for scatter plots
 */
export const scatterPlotColorSchemes = {
  default: ['#4269d0', '#efb118', '#ff725c', '#6cc5b0', '#3ca951', '#ff8ab7', '#a463f2', '#97bbf5', '#9c6b4e', '#b0b0b0'],
  categorical: ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf'],
  vibrant: ['#ef4444', '#f97316', '#f59e0b', '#84cc16', '#10b981', '#06b6d4', '#3b82f6', '#6366f1', '#8b5cf6', '#ec4899'],
  pastel: ['#93c5fd', '#fcd34d', '#fdba74', '#86efac', '#a5f3fc', '#c4b5fd', '#f9a8d4', '#fca5a5', '#d9f99d', '#fed7aa'],
  earth: ['#78716c', '#57534e', '#a8a29e', '#d6d3d1', '#e7e5e4'],
  ocean: ['#0ea5e9', '#06b6d4', '#14b8a6', '#10b981', '#22c55e'],
  warm: ['#f59e0b', '#f97316', '#ef4444', '#ec4899', '#d946ef'],
  cool: ['#3b82f6', '#6366f1', '#8b5cf6', '#a855f7', '#d946ef'],
}

/**
 * Preset symbol sets for different numbers of categories
 */
export const symbolSets = {
  // 3 categories - most distinct shapes
  set3: ['circle', 'square', 'triangle'],

  // 5 categories - common set
  set5: ['circle', 'square', 'triangle', 'diamond', 'star'],

  // 7 categories - extended set
  set7: ['circle', 'square', 'triangle', 'diamond', 'star', 'cross', 'wye'],

  // Filled variants for better visibility
  filled3: ['circle-fill', 'square-fill', 'triangle-fill'],
  filled5: ['circle-fill', 'square-fill', 'triangle-fill', 'diamond-fill', 'star-fill'],
}
