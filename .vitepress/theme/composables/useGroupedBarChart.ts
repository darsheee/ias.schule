import type { ComputedRef } from 'vue'
import { computed } from 'vue'
import * as Plot from '@observablehq/plot'

export interface GroupedBarChartData {
  [key: string]: string | number
}

export interface GroupedBarChartConfig {
  data: GroupedBarChartData[]
  groupBy: string // Field to group by (e.g., 'category', 'state')
  xField: string // Field for x-axis (e.g., 'age', 'product')
  yField: string // Field for y-axis values (e.g., 'population', 'sales')
  colors?: string[] // Optional custom colors
  title?: string
  xLabel?: string
  yLabel?: string
  marginLeft?: number
  marginBottom?: number
  grid?: boolean
  sort?: boolean // Sort groups by total
}

/**
 * Composable for creating grouped bar chart options
 * @param config - Configuration for the grouped bar chart
 * @returns Computed Plot options for the chart
 */
export function useGroupedBarChart(config: GroupedBarChartConfig): ComputedRef<any> {
  return computed(() => {
    const {
      data,
      groupBy,
      xField,
      yField,
      colors = ['#4f46e5', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'],
      title,
      xLabel,
      yLabel,
      marginLeft = 60,
      marginBottom = 50,
      grid = true,
      sort = false,
    } = config

    // Get unique groups
    const groups = Array.from(new Set(data.map(d => d[groupBy] as string)))

    // Create marks for each group
    const marks = groups.map((group, index) => {
      const groupData = data.filter(d => d[groupBy] === group)
      return Plot.barY(groupData, {
        x: xField,
        y: yField,
        fill: colors[index % colors.length],
        title: d => `${group}: ${d[yField]}`,
        tip: true,
      })
    })

    // Build plot options
    const plotOptions: any = {
      marks,
      marginLeft,
      marginBottom,
      grid,
      x: {
        label: xLabel || xField,
        tickRotate: 0,
      },
      y: {
        label: yLabel || yField,
        grid: true,
      },
      color: {
        legend: true,
        domain: groups,
        range: colors.slice(0, groups.length),
      },
    }

    if (title) {
      plotOptions.title = title
    }

    if (sort) {
      plotOptions.x = {
        ...plotOptions.x,
        domain: Plot.sort(data, {
          x: xField,
          reduce: (values: any[]) => values.reduce((sum, v) => sum + v, 0),
        }),
      }
    }

    return plotOptions
  })
}

/**
 * Composable for creating faceted grouped bar chart (multiple charts side-by-side)
 * @param config - Configuration for the faceted grouped bar chart
 * @returns Computed Plot options for the chart
 */
export function useFacetedGroupedBarChart(config: GroupedBarChartConfig & { facetBy: string }): ComputedRef<any> {
  return computed(() => {
    const {
      data,
      facetBy,
      xField,
      yField,
      colors = ['#4f46e5', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'],
      title,
      xLabel,
      yLabel,
      marginLeft = 60,
      marginBottom = 50,
      grid = true,
    } = config

    return {
      marks: [
        Plot.barY(data, {
          x: xField,
          y: yField,
          fx: facetBy,
          fill: xField,
          tip: true,
        }),
      ],
      marginLeft,
      marginBottom,
      grid,
      fx: {
        label: null,
      },
      x: {
        label: xLabel || xField,
        tickRotate: -45,
      },
      y: {
        label: yLabel || yField,
        grid: true,
      },
      color: {
        range: colors,
      },
      ...(title && { title }),
    }
  })
}

/**
 * Composable for creating Observable-style faceted grouped bar chart
 * Bars colored by category, facets sorted by total
 * @param config - Configuration for the faceted bar chart
 * @returns Computed Plot options for the chart
 */
export function useFacetedBarChart(
  config: Omit<GroupedBarChartConfig, 'groupBy'> & {
    facetBy: string
    colorScheme?: string
    sortFacets?: boolean
    hideXAxis?: boolean
  }
): ComputedRef<any> {
  return computed(() => {
    const {
      data,
      facetBy,
      xField,
      yField,
      colors,
      colorScheme = 'spectral',
      title,
      xLabel,
      yLabel,
      marginLeft = 60,
      marginBottom = 50,
      grid = true,
      sortFacets = true,
      hideXAxis = false,
    } = config

    const barOptions: any = {
      x: xField,
      y: yField,
      fill: xField,
      fx: facetBy,
      tip: true,
    }

    // Add sorting if enabled
    if (sortFacets) {
      barOptions.sort = {
        x: null,
        color: null,
        fx: { value: '-y', reduce: 'sum' }, // Sort facets by sum of y values
      }
    }

    const plotConfig: any = {
      marks: [Plot.barY(data, barOptions), Plot.ruleY([0])],
      marginLeft,
      marginBottom,
      y: {
        tickFormat: 's', // SI notation (k, M, etc.)
        grid,
        label: yLabel || yField,
      },
      color: {
        scheme: colorScheme,
        legend: true,
      },
    }

    // Configure x axis
    if (hideXAxis) {
      plotConfig.x = { axis: null }
    } else {
      plotConfig.x = {
        label: xLabel || xField,
      }
    }

    if (title) {
      plotConfig.title = title
    }

    // Override color scheme with custom colors if provided
    if (colors) {
      plotConfig.color = {
        ...plotConfig.color,
        range: colors,
      }
    }

    return plotConfig
  })
}

/**
 * Composable for creating stacked bar chart
 * @param config - Configuration for the stacked bar chart
 * @returns Computed Plot options for the chart
 */
export function useStackedBarChart(config: GroupedBarChartConfig): ComputedRef<any> {
  return computed(() => {
    const {
      data,
      groupBy,
      xField,
      yField,
      colors = ['#4f46e5', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'],
      title,
      xLabel,
      yLabel,
      marginLeft = 60,
      marginBottom = 50,
      grid = true,
    } = config

    return {
      marks: [
        Plot.barY(data, {
          x: xField,
          y: yField,
          fill: groupBy,
          tip: true,
        }),
        Plot.ruleY([0]),
      ],
      marginLeft,
      marginBottom,
      grid,
      x: {
        label: xLabel || xField,
      },
      y: {
        label: yLabel || yField,
        grid: true,
      },
      color: {
        legend: true,
        range: colors,
      },
      ...(title && { title }),
    }
  })
}

/**
 * Composable for creating time-series stacked bar chart with interval
 * Perfect for monthly/yearly data like the Crimean War example
 * @param config - Configuration for the time-series stacked bar chart
 * @returns Computed Plot options for the chart
 */
export function useTimeSeriesStackedBarChart(
  config: Omit<GroupedBarChartConfig, 'xField' | 'groupBy'> & {
    dateField: string
    categoryField: string
    interval?: 'day' | 'week' | 'month' | 'quarter' | 'year'
    tickFormat?: (date: Date) => string
    hideXLabel?: boolean
  }
): ComputedRef<any> {
  return computed(() => {
    const {
      data,
      dateField,
      categoryField,
      yField,
      interval = 'month',
      tickFormat,
      colors = ['#4f46e5', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'],
      title,
      xLabel,
      yLabel,
      marginLeft = 60,
      marginBottom = 50,
      grid = true,
      hideXLabel = false,
    } = config

    // Default tick format for months
    const defaultTickFormat = (d: Date) => d.toLocaleString('en', { month: 'narrow' })

    return {
      marks: [
        Plot.barY(data, {
          x: dateField,
          y: yField,
          fill: categoryField,
          tip: true,
        }),
        Plot.ruleY([0]),
      ],
      marginLeft,
      marginBottom,
      x: {
        interval,
        tickFormat: tickFormat || defaultTickFormat,
        label: hideXLabel ? null : xLabel,
      },
      y: {
        label: yLabel || yField,
        grid,
      },
      color: {
        legend: true,
        range: colors,
      },
      ...(title && { title }),
    }
  })
}
