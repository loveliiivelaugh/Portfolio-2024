import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { LineChart } from '@mui/x-charts/LineChart';
import { PieChart } from '@mui/x-charts/PieChart';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, Typography } from '@mui/material';

const defaults = {
    bar: {
        series: [
            { data: [35, 44, 24, 34] },
            { data: [51, 6, 49, 30] },
            { data: [15, 25, 30, 50] },
            { data: [60, 50, 15, 25] },
        ],
        xAxis: [{ data: ['Q1', 'Q2', 'Q3', 'Q4'], scaleType: 'band' }]
    },
    line: {
        series: [
            {
                data: [2, 5.5, 2, 8.5, 1.5, 5],
            },
        ],
        xAxis: [{ data: [1, 2, 3, 5, 8, 10] }]
    },
    pie: {
        data: [
            { id: 0, value: 10, label: 'series A' },
            { id: 1, value: 15, label: 'series B' },
            { id: 2, value: 20, label: 'series C' },
        ]
    },
}

const rows = [
    { id: 1, col1: 'Hello', col2: 'World' },
    { id: 2, col1: 'DataGridPro', col2: 'is Awesome' },
    { id: 3, col1: 'MUI', col2: 'is Amazing' },
];
  
  const columns = [
    { field: 'col1', headerName: 'Column 1', width: 150 },
    { field: 'col2', headerName: 'Column 2', width: 150 },
];
  

const ChartButtons = (props) => {
    const buttons = [
        {
            label: "Bar",
            value: "bar"
        },
        {
            label: "Line",
            value: "line"
        },
        {
            label: "Pie",
            value: "pie"
        },
        {
            label: "Table",
            value: "table"
        }
    ];

    return (
        <Box sx={{ display:"flex", justifyContent: "space-between", gap: 1 }}>
            {buttons.map((button) => (
                <Button
                    key={`${button.value}-chart-button`}
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => props.setActiveChart(button.value)}
                >
                    {button.label}
                </Button>
            ))}
        </Box>
    )
}


const ChartsContainer = ({ charts, label, disableChartButtons = false }) => {
    const [activeChart, setActiveChart] = React.useState("table");
    // console.log("ChartsContainer.data: ", charts);

    return (
        <div>

            {/* Chart Container Header */}
            <Box sx={{ display:"flex", justifyContent: "space-between", p: 1 }}>
                <Typography variant="body1">
                    {charts?.[activeChart].title || label}
                </Typography>

                {!disableChartButtons && <ChartButtons setActiveChart={setActiveChart} />}
            </Box>

            {disableChartButtons
                ? (
                    <div>
                        <DataGrid {...charts.table} />
                    </div>
                ) : ({
                    bar: (
                        <BarChart
                            series={charts?.bar.series || defaults.bar.series}
                            height={290}
                            xAxis={charts?.bar.xAxis || defaults.bar.xAxis}
                            margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
                        />
                    ),
                    line: (
                        <LineChart
                            xAxis={charts?.line.xAxis || defaults.line.xAxis}
                            series={charts?.line.series || defaults.line.series}
                            width={500}
                            height={300}
                            sx={{ height: 300, maxHeight: 300, width: '100%' }}
                        />
                    ),
                    pie: (
                        <PieChart
                            series={[
                                {
                                    data: charts?.pie.data || defaults.pie.data,
                                },
                            ]}
                            width={400}
                            height={200}
                        />
                    ),
                    table: (
                        <div style={{ height: 300, maxHeight: 300, width: '100%' }}>
                            <DataGrid rows={charts?.table.rows || []} columns={charts?.table.columns || []} />
                        </div>
                    )
                }[activeChart])
            }
        </div>
    )
}

export default ChartsContainer