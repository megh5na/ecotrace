import { CarbonChart } from "../carbon-chart";

export default function CarbonChartExample() {
  const mockData = [
    { date: "Mon", carbon: 15.2 },
    { date: "Tue", carbon: 12.8 },
    { date: "Wed", carbon: 14.1 },
    { date: "Thu", carbon: 11.5 },
    { date: "Fri", carbon: 13.2 },
    { date: "Sat", carbon: 10.8 },
    { date: "Sun", carbon: 9.4 },
  ];

  return (
    <div className="p-6">
      <CarbonChart data={mockData} />
    </div>
  );
}
