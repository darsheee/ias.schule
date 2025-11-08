import { computed } from 'vue'
import type { ComputedRef } from 'vue'
import * as Plot from '@observablehq/plot'

export interface AreaChartData {
  [key: string]: any
}

export interface AreaChartConfig {
  data: AreaChartData[]
  x: string // X-axis field name
  y: string // Y-axis field name
  fill?: string // Fill field for stacking/coloring
  curve?: 'linear' | 'step' | 'step-before' | 'step-after' | 'basis' | 'cardinal' | 'catmull-rom' | 'monotone-x' | 'monotone-y' | 'natural'
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
  showGrid?: boolean
  showTooltip?: boolean
}

/**
 * Composable for creating stacked area chart configuration
 * Uses Observable Plot's areaY mark with automatic stacking
 * @param config - Configuration for the stacked area chart
 * @returns Computed configuration for PlotChart component
 */
export function useStackedAreaChart(config: AreaChartConfig): ComputedRef<any> {
  return computed(() => {
    const {
      data,
      x,
      y,
      fill,
      curve = 'catmull-rom',
      width = 928,
      height = 500,
      marginLeft = 50,
      marginRight = 20,
      marginTop = 20,
      marginBottom = 40,
      title,
      xLabel,
      yLabel,
      colors,
      showGrid = true,
      showTooltip = true,
    } = config

    const marks: any[] = [
      Plot.areaY(data, {
        x,
        y,
        fill: fill || undefined,
        curve,
        title: showTooltip ? fill : undefined,
        tip: showTooltip,
      }),
      Plot.ruleY([0]),
    ]

    const plotConfig: any = {
      width,
      height,
      marginLeft,
      marginRight,
      marginTop,
      marginBottom,
      marks,
      y: {
        grid: showGrid,
        label: yLabel || `↑ ${y}`,
      },
      x: {
        label: xLabel || x,
      },
    }

    if (title) {
      plotConfig.title = title
    }

    if (colors) {
      plotConfig.color = {
        range: colors,
      }
    }

    return plotConfig
  })
}

/**
 * Composable for creating simple area chart (non-stacked)
 * @param config - Configuration for the area chart
 * @returns Computed configuration for PlotChart component
 */
export function useAreaChart(config: Omit<AreaChartConfig, 'fill'>): ComputedRef<any> {
  return computed(() => {
    const {
      data,
      x,
      y,
      curve = 'catmull-rom',
      width = 928,
      height = 500,
      marginLeft = 50,
      marginRight = 20,
      marginTop = 20,
      marginBottom = 40,
      title,
      xLabel,
      yLabel,
      colors,
      showGrid = true,
      showTooltip = true,
    } = config

    const fillColor = colors?.[0] || '#3b82f6'

    const marks: any[] = [
      Plot.areaY(data, {
        x,
        y,
        curve,
        fill: fillColor,
        fillOpacity: 0.3,
        tip: showTooltip,
      }),
      Plot.lineY(data, {
        x,
        y,
        curve,
        stroke: fillColor,
        strokeWidth: 2,
      }),
      Plot.ruleY([0]),
    ]

    const plotConfig: any = {
      width,
      height,
      marginLeft,
      marginRight,
      marginTop,
      marginBottom,
      marks,
      y: {
        grid: showGrid,
        label: yLabel || `↑ ${y}`,
      },
      x: {
        label: xLabel || x,
      },
    }

    if (title) {
      plotConfig.title = title
    }

    return plotConfig
  })
}

/**
 * Preset color schemes for area charts
 */
export const areaChartColorSchemes = {
  default: ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981'],
  pastel: ['#93c5fd', '#c4b5fd', '#f9a8d4', '#fcd34d', '#6ee7b7'],
  ocean: ['#0ea5e9', '#06b6d4', '#14b8a6', '#10b981', '#22c55e'],
  warm: ['#f59e0b', '#f97316', '#ef4444', '#ec4899', '#d946ef'],
  cool: ['#3b82f6', '#6366f1', '#8b5cf6', '#a855f7', '#d946ef'],
  earth: ['#78716c', '#a8a29e', '#d6d3d1', '#e7e5e4', '#f5f5f4'],
  vibrant: ['#ef4444', '#f97316', '#f59e0b', '#84cc16', '#10b981'],
  categorical10: ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf'],
}
