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
  endDay: number,
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
  let s = daysSinceBeginningOfTheYear(entry.start);
  const e = daysSinceBeginningOfTheYear(entry.end);
  if (s > e) { // TODO: Handle case, where 01-01 can be threatened as 12-31 properly.
    s = 1;
  }
  return {
    startDay: s,
    endDay: e,
    entry: entry,
  }
}
const daysInYear = 365; // TODO:Handle viscosny).
const barStyle = "h-10 border-1 absolute bg-orange-300";
const App: Component = () => {
  const a = convertEntryToBarEntry(tl.ranges[0]);
  const b = (a.startDay / daysInYear * 100).toFixed(2);
  const bb = (a.endDay / daysInYear * 100).toFixed(2);
  return (
    <div style={{
      "width": `${bb}%`,
      "left": `${b}%`
    }} class={barStyle}>
      {a.startDay}, {a.endDay}
    </div >
  );
}

export default App;
