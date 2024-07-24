'use client'
import { AdminMenu } from '@/Components/AdminMenu'
import { GraphStat } from '@/Components/BackOffice/Stats/Care/GraphStat'
import { StatFilterLabels, StatFilterOptions } from '@/Utils/types'
import React, { useState } from 'react'

const page = () => {
    const [filter, setFilter] = useState(`${StatFilterOptions.Care}`)
    return (
        <main className="flex">
            <AdminMenu />
            <div className="flex min-h-screen flex-col pt-8 px-6 lg:px-8 bg-white w-screen">
                <div>
                    <label
                        htmlFor="staffName"
                        className="block text-sm font-medium leading-6 text-gray-900"
                    >
                        Sujet
                    </label>
                    <div className="mt-2">
                        <select
                            className="block w-full sm:w-1/2 md:w-1/3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 indent:3 pl-3"
                            onChange={(e) => setFilter(e.target.value)}
                        >
                            <option value={StatFilterOptions.Care}>
                                {StatFilterLabels.Care}
                            </option>
                            <option value={StatFilterOptions.Location}>
                                {StatFilterLabels.Location}
                            </option>
                            <option value={StatFilterOptions.Injury}>
                                {StatFilterLabels.Injury}
                            </option>
                            <option value={StatFilterOptions.Staff}>
                                {StatFilterLabels.Staff}
                            </option>
                            <option value={StatFilterOptions.Moment}>
                                {StatFilterLabels.Moment}
                            </option>
                        </select>
                    </div>
                </div>
                <GraphStat filter={filter} />
            </div>
        </main>
    )
}

export default page
