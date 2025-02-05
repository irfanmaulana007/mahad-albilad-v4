import { useQuery } from '@apollo/client'
import {
  GetAnalyticsOverviewQuery,
  GetAnalyticsOverviewQueryVariables,
} from '__generated__/gql/graphql'
import moment from 'moment'

import { getAnalyticsOverviewQuery } from 'services/queries/activity'

import { IDashboardOverview } from './type'

export default function DashboardOverview({ startDate, endDate }: IDashboardOverview) {
  const { data, loading } = useQuery<GetAnalyticsOverviewQuery, GetAnalyticsOverviewQueryVariables>(
    getAnalyticsOverviewQuery,
    {
      variables: {
        startDate: moment(startDate).format('YYYY-MM-DD'),
        endDate: moment(endDate).format('YYYY-MM-DD'),
      },
      fetchPolicy: 'network-only',
    },
  )

  const totalLikes = data?.getAnalyticsOverview?.totalLikes || 0
  const totalShares = data?.getAnalyticsOverview?.totalShares || 0
  const totalViews = data?.getAnalyticsOverview?.totalViews || 0

  return (
    <div className='grid grid-cols-3 gap-4'>
      <div className='w-full bg-white rounded-lg p-4 flex flex-col gap-4'>
        <div className='flex flex-col gap-4'>
          <p className='text-sm font-medium text-gray-700'>Total Views</p>
          <div className='flex justify-center gap-2'>
            {loading ? (
              <div className='h-10 w-full bg-gray-200 rounded-md animate-pulse' />
            ) : (
              <p className='text-2xl font-bold text-gray-700'>{totalViews} Views</p>
            )}
          </div>
        </div>
      </div>
      <div className='w-full bg-white rounded-lg p-4 flex flex-col gap-4'>
        <div className='flex flex-col gap-4'>
          <p className='text-sm font-medium text-gray-700'>Total Likes</p>
          <div className='flex justify-center gap-2'>
            {loading ? (
              <div className='h-10 w-full bg-gray-200 rounded-md animate-pulse' />
            ) : (
              <p className='text-2xl font-bold text-gray-700'>{totalLikes} Likes</p>
            )}
          </div>
        </div>
      </div>
      <div className='w-full bg-white rounded-lg p-4 flex flex-col gap-4'>
        <div className='flex flex-col gap-4'>
          <p className='text-sm font-medium text-gray-700'>Total Shares</p>
          <div className='flex justify-center gap-2'>
            {loading ? (
              <div className='h-10 w-full bg-gray-200 rounded-md animate-pulse' />
            ) : (
                <p className='text-2xl font-bold text-gray-700'>{totalShares} Shares</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
