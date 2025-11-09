/**
 * Simple Chart Syntax Parser
 * Converts minimal text syntax to D3/Plot chart configurations
 * 
 * Usage:
 * ```chart
 * pie title My Chart
 *     "Category A" : 100
 *     "Category B" : 200
 * ```
 */

import { usePieChart, useDonutChart, pieChartColorSchemes } from './usePieChart'
// import { useGroupedBarChart } from './useGroupedBarChart' // TODO: Add bar chart support

interface ChartData {
  name: string
  value: number
  [key: string]: any
}

/**
 * Parse pie/donut chart syntax
 * Format:
 * pie title My Title
 *     "Item 1" : 100
 *     "Item 2" : 200
 */
function parsePieChart(text: string) {
  const lines = text.trim().split('\n')
  const firstLine = lines[0].trim()
  
  // Extract type and title
  const match = firstLine.match(/^(pie|donut)\s+title\s+(.+)$/i)
  if (!match) {
    throw new Error('Invalid chart syntax. Expected: pie/donut title <Title>')
  }
  
  const type = match[1].toLowerCase()
  const title = match[2].trim()
  
  // Parse data lines
  const data: ChartData[] = []
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim()
    if (!line) continue
    
    // Match: "Name" : Value
    const dataMatch = line.match(/^"([^"]+)"\s*:\s*(\d+(?:\.\d+)?)/)
    if (dataMatch) {
      data.push({
        name: dataMatch[1],
        value: parseFloat(dataMatch[2]),
      })
    }
  }
  
  if (data.length === 0) {
    throw new Error('No data found in chart')
  }
  
  // Generate chart config
  const chartFn = type === 'donut' ? useDonutChart : usePieChart
  return {
    type,
    title,
    config: chartFn({
      data,
      width: 600,
      colors: pieChartColorSchemes.vibrant,
    }),
  }
}

/**
 * Parse bar chart syntax
 * Format:
 * bar title My Title
 *     "Category A" : 100
 *     "Category B" : 200
 */
function parseBarChart(text: string) {
  const lines = text.trim().split('\n')
  const firstLine = lines[0].trim()
  
  const match = firstLine.match(/^bar\s+title\s+(.+)$/i)
  if (!match) {
    throw new Error('Invalid bar chart syntax')
  }
  
  const title = match[1].trim()
  
  // Parse data
  const data: ChartData[] = []
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim()
    if (!line) continue
    
    const dataMatch = line.match(/^"([^"]+)"\s*:\s*(\d+(?:\.\d+)?)/)
    if (dataMatch) {
      data.push({
        name: dataMatch[1],
        value: parseFloat(dataMatch[2]),
      })
    }
  }
  
  return {
    type: 'bar',
    title,
    data, // Return raw data for now, component will handle display
  }
}

/**
 * Parse line chart syntax
 * Format:
 * line title My Title
 *     2020 : 100
 *     2021 : 150
 *     2022 : 200
 */
function parseLineChart(text: string) {
  const lines = text.trim().split('\n')
  const firstLine = lines[0].trim()
  
  const match = firstLine.match(/^line\s+title\s+(.+)$/i)
  if (!match) {
    throw new Error('Invalid line chart syntax')
  }
  
  const title = match[1].trim()
  
  // Parse data
  const data: ChartData[] = []
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim()
    if (!line) continue
    
    const dataMatch = line.match(/^"?([^":]+)"?\s*:\s*(\d+(?:\.\d+)?)/)
    if (dataMatch) {
      data.push({
        name: dataMatch[1].trim(),
        value: parseFloat(dataMatch[2]),
      })
    }
  }
  
  return {
    type: 'line',
    title,
    data,
  }
}

/**
 * Main parser - detects chart type and routes to appropriate parser
 */
export function parseSimpleChart(text: string) {
  const firstLine = text.trim().split('\n')[0].toLowerCase()
  
  if (firstLine.startsWith('pie')) {
    return parsePieChart(text)
  }
  else if (firstLine.startsWith('donut')) {
    return parsePieChart(text)
  }
  else if (firstLine.startsWith('bar')) {
    return parseBarChart(text)
  }
  else if (firstLine.startsWith('line')) {
    return parseLineChart(text)
  }
  else {
    throw new Error(`Unknown chart type in: ${firstLine}`)
  }
}

/**
 * Convert simple chart text to Vue component props
 */
export function useSimpleChart(text: string) {
  try {
    const result = parseSimpleChart(text)
    return {
      success: true,
      ...result,
    }
  }
  catch (error: any) {
    return {
      success: false,
      error: error.message,
    }
  }
}
