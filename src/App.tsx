import type { Component } from 'solid-js';

interface TimelineEntry {
  start: string,
  end: string,
  name: string,
}

interface Timeline {
  ranges: TimelineEntry[],
}

interface BarEntry {
  startDay: number,
  endDat: number,
  entry: TimelineEntry
}
const tl: Timeline = {
  ranges: [{
    start: "2020-01-01",
    end: "2020-10-13",
    name: "tt"
  }]
};

function daysSinceBeginningOfTheYear(date: string): number {
  const tempDate = new Date(date);
  const dateTimestamp = new Date(tempDate.getTime());
  const firstDay = new Date(tempDate.getFullYear(), 0, 1);
  return Math.ceil((dateTimestamp - firstDay + 1) / 86400000).toFixed(0);
}

function convertEntryToBarEntry(entry: TimelineEntry): BarEntry {
  return {
    startDay: daysSinceBeginningOfTheYear(entry.start),
    endDat: daysSinceBeginningOfTheYear(entry.end),
    entry: entry,
  }
}
const App: Component = () => {
  return (
    <div class="container mx-auto">
      <div class="box-border h-32 w-32 p-4 border-4 bg-orange-300">
        h
      </div>
    </div>
  );
}

export default App;
