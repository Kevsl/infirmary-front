import { InputContainer } from '@/Components/InputContainer'
import { getCareIncidentStats } from '@/Service/incident.service'
import { monthesList } from '@/Utils/const'
import { searchIncidentResolver } from '@/Utils/resolvers/searchIncidentResolver'
import { IncidentDate } from '@/Utils/types'
import { generateYearsList } from '@/Utils/yearList'
import { BarChart } from '@mui/x-charts/BarChart'
import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

export const CareStat = () => {
    const [month, setMonth] = useState<number>(0)
    const [year, setYear] = useState<number>(0)
    const monthes = monthesList
    const years = generateYearsList(new Date().getFullYear(), 9)
    const [labels, setLabels] = useState<string[]>([''])
    const [count, setCount] = useState<number[]>([0])

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<IncidentDate>({
        resolver: searchIncidentResolver,
    })

    const onSubmit: SubmitHandler<IncidentDate> = (data) => {
        const caresIncidentCounts = [0]
        const caresIncidentLabels = ['']
        getCareIncidentStats(data).then((res) => {
            res.data.map((element: any) => {
                caresIncidentLabels.push(element.care)
                caresIncidentCounts.push(element.count)
            })
            setLabels(caresIncidentLabels)
            setCount(caresIncidentCounts)
        })
    }

    useEffect(() => {
        console.log(count, labels)
    }, [count, labels])
    return (
        <div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex items-center justify-between my-8"
            >
                <div className="w-5/12 min-h-32">
                    <p className="font-bold text-md italic">Du :</p>
                    <InputContainer title="" htmlFor="month">
                        <div className="flex items-center">
                            <select
                                className="mr-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 indent:3 pl-3"
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
                        </div>
                    </InputContainer>
                    <button type="submit">Rechercher</button>
                </div>
            </form>
            <div className="w-1/2 mx-auto flex items-center justify-center">
                <BarChart
                    xAxis={[
                        {
                            scaleType: 'band',
                            data: labels,
                        },
                    ]}
                    series={[{ data: count }]}
                    width={500}
                    height={300}
                />
            </div>
        </div>
    )
}
