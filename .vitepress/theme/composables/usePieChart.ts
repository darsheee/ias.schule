import type { ComputedRef } from 'vue'
import { computed } from 'vue'

export interface PieChartData {
  name: string
  value: number
}

export interface PieChartConfig {
  data: PieChartData[]
  width?: number
  height?: number
  innerRadius?: number // 0 for pie chart, >0 for donut chart
  padAngle?: number // Spacing between slices in radians
  colors?: string[]
  showLabels?: boolean
  showValues?: boolean
}

/**
 * Composable for creating pie chart configuration
 * @param config - Configuration for the pie chart
 * @returns Computed configuration for PieChart component
 */
export function usePieChart(config: PieChartConfig): ComputedRef<PieChartConfig> {
  return computed(() => {
    const {
      data,
      width = 500,
      height,
      innerRadius = 0, // 0 = pie chart, >0 = donut chart
      padAngle,
      colors,
      showLabels = true,
      showValues = true,
    } = config

    return {
      data,
      width,
      height: height || Math.min(width, 500),
      innerRadius,
      padAngle,
      colors,
      showLabels,
      showValues,
    }
  })
}

/**
 * Composable for creating donut chart configuration
 * @param config - Configuration for the donut chart
 * @returns Computed configuration for PieChart component
 */
export function useDonutChart(config: Omit<PieChartConfig, 'innerRadius'>): ComputedRef<PieChartConfig> {
  return computed(() => {
    const {
      data,
      width = 500,
      height,
      padAngle,
      colors,
      showLabels = true,
      showValues = true,
    } = config

    const calculatedHeight = height || Math.min(width, 500)
    const radius = Math.min(width, calculatedHeight) / 2

    return {
      data,
      width,
      height: calculatedHeight,
      innerRadius: radius * 0.67, // Donut hole is 67% of radius (matching Observable example)
      padAngle: padAngle ?? 1 / radius, // Auto-calculate padding if not provided
      colors,
      showLabels,
      showValues,
    }
  })
}

/**
 * Preset color schemes for pie/donut charts
 */
export const pieChartColorSchemes = {
  default: ['#4f46e5', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16'],
  pastel: ['#FFB3BA', '#FFDFBA', '#FFFFBA', '#BAFFC9', '#BAE1FF', '#E0BBE4', '#FFDFD3', '#C9E4DE'],
  vibrant: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7B731', '#5F27CD', '#00D2D3'],
  corporate: ['#003f5c', '#2f4b7c', '#665191', '#a05195', '#d45087', '#f95d6a', '#ff7c43', '#ffa600'],
  earth: ['#8B4513', '#CD853F', '#DEB887', '#F4A460', '#D2691E', '#BC8F8F', '#F5DEB3', '#FFE4B5'],
  ocean: ['#006994', '#0080a3', '#0096b2', '#00adc1', '#00c3cf', '#4dd9dc', '#80e0e0', '#b3f0ff'],
  sunset: ['#5e3794', '#783b96', '#924099', '#ac449b', '#c6499d', '#e04d9e', '#fa52a0', '#ff7bb3'],
  forest: ['#2d5016', '#3d6a1f', '#4e8428', '#5e9f31', '#6fb93a', '#7fd343', '#8fed4c', '#a0ff55'],
}

/**
 * Helper function to calculate percentage
 */
export function calculatePercentages(data: PieChartData[]): Array<PieChartData & { percentage: number }> {
  const total = data.reduce((sum, d) => sum + d.value, 0)
  return data.map(d => ({
    ...d,
    percentage: (d.value / total) * 100,
  }))
}

/**
 * Helper function to sort data by value
 */
export function sortPieData(data: PieChartData[], descending = true): PieChartData[] {
  return [...data].sort((a, b) => descending ? b.value - a.value : a.value - b.value)
}

/**
 * Helper function to group small values into "Others"
 */
export function groupSmallValues(
  data: PieChartData[],
  threshold: number = 5, // percentage threshold
  otherLabel: string = 'Others'
): PieChartData[] {
  const total = data.reduce((sum, d) => sum + d.value, 0)
  const minValue = (threshold / 100) * total

  const large: PieChartData[] = []
  let othersValue = 0

  data.forEach(d => {
    if (d.value >= minValue) {
      large.push(d)
    } else {
      othersValue += d.value
    }
  })

  if (othersValue > 0) {
    large.push({ name: otherLabel, value: othersValue })
  }

  return large
}
