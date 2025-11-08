import { computed } from 'vue'
import type { ComputedRef } from 'vue'
import * as Plot from '@observablehq/plot'

export interface PercentogramData {
  value: number
  [key: string]: any
}

export interface PercentogramConfig {
  data: number[] | PercentogramData[]
  valueField?: string // Field name if data is objects
  bins?: number // Number of percentile bins (default: 10 for deciles)
  colorScheme?: string
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
}

/**
 * Calculate percentile thresholds
 * @param data - Sorted array of values
 * @param bins - Number of bins
 * @returns Array of percentile thresholds
 */
function calculatePercentiles(data: number[], bins: number): number[] {
  const sorted = [...data].sort((a, b) => a - b)
  const n = sorted.length
  const thresholds: number[] = []
  
  for (let i = 0; i <= bins; i++) {
    const index = Math.floor((i / bins) * n)
    const value = sorted[Math.min(index, n - 1)]
    thresholds.push(value)
  }
  
  return thresholds
}

/**
 * Composable for creating percentogram charts
 * A histogram binned by percentages of the cumulative distribution
 * Ref: Andrew Gelman's percentogram concept
 * @param config - Configuration for the percentogram
 * @returns Computed configuration for PlotChart component
 */
export function usePercentogram(config: PercentogramConfig): ComputedRef<any> {
  return computed(() => {
    const {
      data,
      valueField,
      bins = 10,
      colorScheme = 'spectral',
      width = 640,
      height = 400,
      marginLeft = 60,
      marginRight = 20,
      marginTop = 20,
      marginBottom = 40,
      title,
      xLabel,
      yLabel = 'Density',
      showGrid = true,
    } = config

    // Extract values from data
    let values: number[]
    if (typeof data[0] === 'number') {
      values = data as number[]
    } else if (valueField) {
      values = (data as PercentogramData[]).map(d => d[valueField] as number)
    } else {
      values = (data as PercentogramData[]).map(d => d.value)
    }

    // Calculate percentile thresholds
    const percentiles = calculatePercentiles(values, bins)

    const marks: any[] = [
      Plot.rectY(values, {
        fill: (_d: any, i: number) => i,
        ...Plot.binX({
          y: (_bin: any, { x1, x2 }: any) => 1 / (x2 - x1), // Density calculation
          thresholds: percentiles,
        }),
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
      color: {
        legend: true,
        type: 'quantize',
        scheme: colorScheme,
        n: bins,
        label: 'Percentile',
      },
      y: {
        label: yLabel,
        grid: showGrid,
      },
      x: {
        label: xLabel,
      },
      ...(title && { title }),
    }
  })
}

/**
 * Composable for creating percentogram with custom percentiles
 * Allows specifying exact percentiles (e.g., quartiles, deciles)
 * @param config - Configuration for the percentogram
 * @returns Computed configuration for PlotChart component
 */
export function useCustomPercentogram(
  config: PercentogramConfig & {
    percentiles: number[] // Custom percentile values (0-100)
  }
): ComputedRef<any> {
  return computed(() => {
    const {
      data,
      valueField,
      percentiles: customPercentiles,
      colorScheme = 'spectral',
      width = 640,
      height = 400,
      marginLeft = 60,
      marginRight = 20,
      marginTop = 20,
      marginBottom = 40,
      title,
      xLabel,
      yLabel = 'Density',
      showGrid = true,
    } = config

    // Extract values from data
    let values: number[]
    if (typeof data[0] === 'number') {
      values = data as number[]
    } else if (valueField) {
      values = (data as PercentogramData[]).map(d => d[valueField] as number)
    } else {
      values = (data as PercentogramData[]).map(d => d.value)
    }

    // Calculate thresholds for custom percentiles
    const sorted = [...values].sort((a, b) => a - b)
    const n = sorted.length
    const thresholds = customPercentiles.map(p => {
      const index = Math.floor((p / 100) * n)
      return sorted[Math.min(index, n - 1)]
    })

    const marks: any[] = [
      Plot.rectY(values, {
        fill: (_d: any, i: number) => i,
        ...Plot.binX({
          y: (_bin: any, { x1, x2 }: any) => 1 / (x2 - x1),
          thresholds,
        }),
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
      color: {
        legend: true,
        type: 'quantize',
        scheme: colorScheme,
        n: customPercentiles.length,
        label: 'Percentile',
      },
      y: {
        label: yLabel,
        grid: showGrid,
      },
      x: {
        label: xLabel,
      },
      ...(title && { title }),
    }
  })
}

/**
 * Preset percentile configurations
 */
export const percentilePresets = {
  // Standard divisions
  deciles: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100], // 10 bins
  quartiles: [0, 25, 50, 75, 100], // 4 bins
  quintiles: [0, 20, 40, 60, 80, 100], // 5 bins
  tertiles: [0, 33.33, 66.67, 100], // 3 bins
  
  // Fine-grained
  vigintiles: [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100], // 20 bins
  
  // Focus on tails
  tailFocus: [0, 5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 95, 100], // More bins at extremes
  
  // Focus on median
  medianFocus: [0, 10, 20, 30, 40, 45, 50, 55, 60, 70, 80, 90, 100], // More bins near center
}

/**
 * Color schemes suitable for percentograms
 */
export const percentogramColorSchemes = {
  spectral: 'spectral', // Observable default
  rdylgn: 'RdYlGn',
  rdylbu: 'RdYlBu',
  puor: 'PuOr',
  brbg: 'BrBG',
  piyg: 'PiYG',
  prgn: 'PRGn',
  rdgy: 'RdGy',
  rdbu: 'RdBu',
  blues: 'blues',
  reds: 'reds',
  greens: 'greens',
  purples: 'purples',
  oranges: 'oranges',
  viridis: 'viridis',
  turbo: 'turbo',
  cool: 'cool',
  warm: 'warm',
}

/**
 * Generate random normal distribution for testing
 * @param count - Number of values
 * @param mean - Mean of distribution
 * @param stdDev - Standard deviation
 * @returns Array of random values
 */
export function generateNormalDistribution(
  count: number,
  mean: number = 0,
  stdDev: number = 1
): number[] {
  const values: number[] = []
  
  for (let i = 0; i < count; i++) {
    // Box-Muller transform for normal distribution
    const u1 = Math.random()
    const u2 = Math.random()
    const z0 = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2)
    values.push(z0 * stdDev + mean)
  }
  
  return values
}

/**
 * Generate random log-normal distribution
 * @param count - Number of values
 * @param mu - Mean of underlying normal
 * @param sigma - Std dev of underlying normal
 * @returns Array of random values
 */
export function generateLogNormalDistribution(
  count: number,
  mu: number = 0,
  sigma: number = 1
): number[] {
  const normal = generateNormalDistribution(count, mu, sigma)
  return normal.map(x => Math.exp(x))
}
