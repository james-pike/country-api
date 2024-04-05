import { Activity, BarChart3, Euro, ScatterChart } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import Navbar1 from "@/components/ui/navbar";
import { Country, columns } from "./countries/columns";
import { DataTable } from "./countries/data-table";

async function getData(): Promise<Country[]> {
  const res = await fetch("https://restcountries.com/v3.1/all");
  const data = await res.json();
  return data;
}

export default async function Page() {
  const data = await getData()
  let unMemberCount = 0;
  let eurCurrencyCount = 0;
  let densities: number[] = [];
  let average = 0;
  let median = 0;
  let sum = 0;

  data.forEach((country) => {
    if (country.unMember) {
      unMemberCount++;
    }

    if (country.currencies) {
      if (country.currencies.hasOwnProperty("EUR")) {
        eurCurrencyCount++;
      }
    }

    let density = calcDensity(country.population, country.area)
    densities.push(density);
    sum += density;
    median = findMedian(densities)
    average = sum / densities.length;
  })

  return (
    <main className="bg-gray-50">
    
      <div className="container mx-auto py-6 sm:pt-7">
      <h1 className="text-black text-lg">Country Population Density</h1>
        <div className="flex justify-between">
          <h1></h1>
        </div>
        <br></br>
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Mean Population Density
              </CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{average.toFixed(1)} / km²</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Median Population Density
              </CardTitle>
              <ScatterChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{median.toFixed(1)} / km²</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Standard Deviation of Density</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{StandardDeviation(densities).toFixed(1)} / km²</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">UN Members / Euro Countries</CardTitle>
              <Euro className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{unMemberCount} / {eurCurrencyCount}</div>
            </CardContent>
          </Card>
        </div>
        <div className="py-3"></div>
        <div className="bg-white">
          <DataTable columns={columns} data={data} />
        </div>
      </div>
    </main>
  )
}

function calcDensity(population: any, area: any) {
  return population / area;
}

function StandardDeviation(arr: number[]) {

  let mean = arr.reduce((acc, curr) => {
    return acc + curr
  }, 0) / arr.length;

  arr = arr.map((k) => {
    return (k - mean) ** 2
  });

  let sum = arr.reduce((acc, curr) => acc + curr, 0);
  let variance = sum / arr.length
  return Math.sqrt(variance)
}

function findMedian(arr: number[]) {
  arr.sort((a, b) => a - b);
  const middleIndex = Math.floor(arr.length / 2);

  if (arr.length % 2 === 0) {
    return (arr[middleIndex - 1] + arr[middleIndex]) / 2;
  } else {
    return arr[middleIndex];
  }
}