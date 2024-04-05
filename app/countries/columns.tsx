"use client"

import { DataTableColumnHeader } from "@/components/ui/table-header";
import { ColumnDef } from "@tanstack/react-table"

export type Country = {
    id: string;
    name: string;
    population: number;
    area: number;
    unMember: boolean;
    currencies: [];
}

export const columns: ColumnDef<Country>[] = [
    {
        accessorKey: "name.common",
        header: ({ column }) => {
            return (<DataTableColumnHeader column={column} title="Country" />
            )
        },
    },
    {
        accessorKey: "population",
        header: ({ column }) => {
            return (    <div style={{ whiteSpace: 'nowrap' }}>Population Density</div>)
        },
        
        cell: ({ row }) => {
            const population: number = row.original.population;
            const area: number = row.original.area;
            const populationDensity: number = population / area;
            return <div>{populationDensity.toFixed(1)} / km²</div>;
        },
    },
    
    {
        accessorKey: "population",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Population" />
        ),
        cell: ({ row }) => {
            const formattedPopulation: string = Number(row.original.population).toLocaleString();
            return <div>{formattedPopulation}</div>;
        },
    },
    {
        accessorKey: "area",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Area" />
        ),
        cell: ({ row }) => {
            const formattedArea: string = Number(row.original.area).toLocaleString();
            return <div>{formattedArea} km²</div>;
        },
    },
    {
        accessorKey: "unMember",
        header: "UN Member",
    },
]
