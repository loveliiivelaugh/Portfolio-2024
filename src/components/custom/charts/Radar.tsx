import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

const data = [
    {
        subject: 'React',
        A: 120,
        B: 110,
        fullMark: 150,
    },
    {
        subject: 'JavaScript',
        A: 98,
        B: 130,
        fullMark: 150,
    },
    {
        subject: 'TypeScript',
        A: 86,
        B: 130,
        fullMark: 150,
    },
    {
        subject: 'GraphQL',
        A: 99,
        B: 100,
        fullMark: 150,
    },
    {
        subject: 'Redux',
        A: 85,
        B: 90,
        fullMark: 150,
    },
    {
        subject: 'Sql',
        A: 65,
        B: 85,
        fullMark: 150,
    },
];
{/* <ResponsiveContainer width="100%" height="100%">
</ResponsiveContainer> */}
const RadarChartComponent = () => (
    <ResponsiveContainer width={400} height={400}>
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" />
            <PolarRadiusAxis />
            <Radar name="Mike" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
        </RadarChart>
    </ResponsiveContainer>
);

export default RadarChartComponent;