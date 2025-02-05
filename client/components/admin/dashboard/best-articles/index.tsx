import { useQuery } from '@apollo/client'
import {
  ActivityType,
  GetArticleAnalyticsByDateQuery,
  GetArticleAnalyticsByDateQueryVariables,
} from '__generated__/gql/graphql'
import moment from 'moment'
import { useMemo, useState } from 'react'
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import { getArticleAnalyticsByDateQuery } from 'services/queries/activity'

import { IBestArticles } from './type'

export default function BestArticles({ startDate, endDate }: IBestArticles) {
  const [dimension, setDimension] = useState<ActivityType>(ActivityType.ViewArticle)

  const { data, loading } = useQuery<
    GetArticleAnalyticsByDateQuery,
    GetArticleAnalyticsByDateQueryVariables
  >(getArticleAnalyticsByDateQuery, {
    variables: {
      startDate: moment(startDate).format('YYYY-MM-DD'),
      endDate: moment(endDate).format('YYYY-MM-DD'),
      dimension,
    },
    fetchPolicy: 'network-only',
  })

  const colors = [
    '#2196F3',
    '#F44336',
    '#4CAF50',
    '#FFC107',
    '#9C27B0',
    '#FF9800',
    '#795548',
    '#607D8B',
  ]

  const getDimension = (dimension: ActivityType) => {
    if (dimension === ActivityType.ViewArticle) return 'views'
    if (dimension === ActivityType.LikeArticle) return 'likes'
    if (dimension === ActivityType.ShareArticle) return 'shares'
  }

  const dataset = useMemo(() => {
    if (!data) return []
    return data.getArticleAnalyticsByDate
  }, [data])

  const { transformedData, articleNames } = useMemo(() => {
    if (!dataset) return { transformedData: [], articleNames: [] }

    // Create a map of dates to article views
    const dataMap = new Map()
    const articleSet = new Set<string>()

    dataset.forEach((item) => {
      articleSet.add(item.article.title)

      // Iterate through all dates in the dataset
      item.dataset.forEach((dataPoint) => {
        const date = moment(dataPoint.date).format('MMM DD')

        if (!dataMap.has(date)) {
          dataMap.set(date, { name: date })
        }

        // Set the metrics (views) for this article on this date
        const dimensionObject = getDimension(dimension)
        dataMap.get(date)[item.article.title] = dimensionObject
          ? dataPoint.metrics?.[dimensionObject]
          : 0
      })
    })

    return {
      transformedData: Array.from(dataMap.values()),
      articleNames: Array.from(articleSet),
    }
  }, [dataset, dimension])

  return (
    <div className='w-full h-[500px] bg-white rounded-lg p-4 flex flex-col gap-4'>
      <div className='flex justify-between items-center'>
        <h2 className='text-xl font-bold'>Best 5 Articles</h2>
        <div className='flex items-center gap-2'>
          <label htmlFor='dimension' className='text-sm font-medium text-gray-700'>
            Dimension
          </label>
          <select
            id='dimension'
            className='border border-gray-300 rounded-md p-2'
            value={dimension}
            onChange={(e) => setDimension(e.target.value as ActivityType)}>
            <option value={ActivityType.ViewArticle}>Views</option>
            <option value={ActivityType.LikeArticle}>Likes</option>
            <option value={ActivityType.ShareArticle}>Shares</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className='flex justify-center items-center h-full'>
          <div className='w-8 h-8 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin'></div>
        </div>
      ) : (
        <ResponsiveContainer width='100%' height='100%'>
          <LineChart
            data={transformedData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 25,
            }}>
            <CartesianGrid strokeDasharray='3 3' stroke='#f0f0f0' opacity={0.4} />
            <XAxis
              dataKey='name'
              tick={{ fill: '#4B5563', fontSize: 12 }}
              axisLine={{ stroke: '#E5E7EB' }}
              tickLine={{ stroke: '#E5E7EB' }}
              dy={10}
              tickFormatter={(value) => moment(value).format('MMM DD')}
            />
            <YAxis
              tick={{ fill: '#4B5563', fontSize: 12 }}
              axisLine={{ stroke: '#E5E7EB' }}
              tickLine={{ stroke: '#E5E7EB' }}
              width={60}
              tickFormatter={(value) => value.toLocaleString()}
              minTickGap={1}
              label={() => {
                return <div className='text-sm font-medium text-gray-700'>{dimension}</div>
              }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.98)',
                border: 'none',
                borderRadius: '8px',
                padding: '12px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
              }}
              labelStyle={{ color: '#111827', fontWeight: 600, marginBottom: '4px' }}
              itemStyle={{ color: '#4B5563', fontSize: '12px' }}
              formatter={(value) => {
                return `${value} ${dimension.toLowerCase().replace('_article', '')}s`
              }}
            />
            <Legend
              wrapperStyle={{
                paddingTop: '20px',
                fontSize: '12px',
              }}
              iconType='circle'
              iconSize={8}
            />
            {articleNames.map((articleName, index) => (
              <Line
                key={articleName}
                type='monotone'
                dataKey={articleName}
                stroke={colors[index]}
                strokeWidth={2}
                dot={false}
                activeDot={{
                  stroke: colors[index],
                  strokeWidth: 2,
                  r: 3,
                  strokeOpacity: 0.8,
                }}
                name={articleName}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  )
}
