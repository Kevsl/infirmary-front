import { FormError } from '@/Components/FormError'
import { InputContainer } from '@/Components/InputContainer'
import { getIncidentStats } from '@/Service/incident.service'
import { monthesList } from '@/Utils/const'
import { searchIncidentResolver } from '@/Utils/resolvers/searchIncidentResolver'
import { IncidentDates } from '@/Utils/types'
import { generateYearsList } from '@/Utils/yearList'
import { ChartContainer } from '@mui/x-charts'
import { BarChart } from '@mui/x-charts/BarChart'
import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

export const GraphStat = ({ filter }: { filter: string }) => {
    const monthes = monthesList
    const years = generateYearsList(new Date().getFullYear(), 9)
    const [labels, setLabels] = useState<string[]>([''])
    const [count, setCount] = useState<number[]>([0])
    const [isLoaded, setIsLoaded] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    let chartWidth = 800

    useEffect(() => {
        try {
            chartWidth = window.innerWidth / 2
        } catch {
            chartWidth = 800
        }
    }, [])

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<IncidentDates>({
        resolver: searchIncidentResolver,
    })
    useEffect(() => {
        if (!isLoaded) {
            setValue('startMonth', 1)
            setValue('startYear', new Date().getFullYear())
            setValue('endMonth', 12)
            setValue('endYear', new Date().getFullYear())
            setIsLoaded(true)
        }
    }, [isLoaded])

    const onSubmit: SubmitHandler<IncidentDates> = (data) => {
        setIsLoading(true)
        const caresIncidentCounts: number[] = []
        const caresIncidentLabels: string[] = []
        getIncidentStats(data, filter).then((res) => {
            setIsLoading(false)

            res.data.map((element: any) => {
                if (element.count > 0) {
                    caresIncidentLabels.push(element.name)
                    caresIncidentCounts.push(element.count)
                    console.log(filter, res)
                }
            })
            setLabels(caresIncidentLabels)
            setCount(caresIncidentCounts)
        })
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex items-center justify-between my-8">
                    <div className="w-5/12 min-h-32">
                        <p className="font-bold text-md italic">Du :</p>
                        <InputContainer title="" htmlFor="month">
                            <div className="flex items-center">
                                <select
                                    className="mr-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 indent:3 pl-3"
                                    defaultValue={''}
                                    {...register('startMonth')}
                                >
                                    <option>Mois</option>

                                    {monthes &&
                                        monthes.map((month) => {
                                            return (
                                                <option
                                                    key={month.id}
                                                    value={month.id}
                                                >
                                                    {month.name}
                                                </option>
                                            )
                                        })}
                                </select>
                                {errors.startMonth?.message && (
                                    <FormError
                                        message={errors.startMonth.message}
                                    />
                                )}
                                <select
                                    className="ml-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 indent:3 pl-3"
                                    {...register('startYear')}
                                >
                                    <option>Année</option>

                                    {years &&
                                        years.map((year) => {
                                            return (
                                                <option
                                                    key={year.id}
                                                    value={year.id}
                                                >
                                                    {year.name}
                                                </option>
                                            )
                                        })}
                                </select>
                                {errors.startYear?.message && (
                                    <FormError
                                        message={errors.startYear.message}
                                    />
                                )}
                            </div>
                        </InputContainer>
                    </div>
                    <div className="w-5/12 min-h-32">
                        <p className="font-bold text-md italic">Au :</p>
                        <InputContainer title="" htmlFor="month">
                            <div className="flex items-center">
                                <select
                                    className="mr-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 indent:3 pl-3"
                                    {...register('endMonth')}
                                >
                                    <option>Mois</option>

                                    {monthes &&
                                        monthes.map((month) => {
                                            return (
                                                <option
                                                    key={month.id}
                                                    value={month.id}
                                                >
                                                    {month.name}
                                                </option>
                                            )
                                        })}
                                </select>
                                {errors.endMonth?.message && (
                                    <FormError
                                        message={errors.endMonth.message}
                                    />
                                )}
                                <select
                                    className="ml-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 indent:3 pl-3"
                                    {...register('endYear')}
                                >
                                    <option>Année</option>

                                    {years &&
                                        years.map((year) => {
                                            return (
                                                <option
                                                    key={year.id}
                                                    value={year.id}
                                                >
                                                    {year.name}
                                                </option>
                                            )
                                        })}
                                </select>
                                {errors.endYear?.message && (
                                    <FormError
                                        message={errors.endYear.message}
                                    />
                                )}
                            </div>
                        </InputContainer>
                    </div>
                </div>
                <div className="w-full flex items-center justify-center">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-center w-48 mx-auto"
                        type="submit"
                    >
                        Rechercher
                    </button>
                </div>
            </form>

            <div className="w-full mx-auto my-8 flex items-center justify-center">
                {!isLoading && isLoaded && (
                    <BarChart
                        xAxis={[
                            {
                                scaleType: 'band',
                                data: labels,
                            },
                        ]}
                        series={[{ data: count, color: '#FCA' }]}
                        width={chartWidth}
                        height={400}
                    />
                )}
            </div>
        </div>
    )
}
