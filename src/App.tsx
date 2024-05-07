import type { Component } from 'solid-js';
import { For } from 'solid-js';

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
  ranges: [
    {
      start: "2020-01-01",
      end: "2020-07-13",
      name: "tt"
    },
    {
      start: "2020-05-12",
      end: "2020-11-17",
      name: "tt2"
    }
  ]
};

function daysSinceBeginningOfTheYear(date: string): string {
  const tempDate = new Date(date);
  const dateTimestamp = new Date(tempDate.getTime()).getTime();
  const firstDay = new Date(tempDate.getFullYear(), 0, 1).getTime();
  return Math.ceil((dateTimestamp - firstDay + 1) / 86400000).toFixed(0);
}

function convertTimelineEntryToBarEntry(entry: TimelineEntry): BarEntry {
  let s = +daysSinceBeginningOfTheYear(entry.start);
  const e = +daysSinceBeginningOfTheYear(entry.end);
  if (s > e) { // TODO: Handle case, where 01-01 can be threatened as 12-31 properly.
    s = 1;
  }
  return {
    startDay: s,
    endDay: e,
    entry: entry,
  }
}

function getOffset(day: number): string {
  return (day / daysInYear * 100).toFixed(2);
}

const daysInYear = 365; // TODO:Handle viscosny).
const barStyle = "h-10 border-1 bg-orange-300 flex items-center justify-center rounded-md m-1";
const App: Component = () => {
  const temp = tl.ranges.map((e) => convertTimelineEntryToBarEntry(e));
  console.log(temp);
  return (
    <div>
      <For each={temp}>{(entry, i) =>
        <div style={{
          "left": `${getOffset(entry.startDay)}%`,
          "width": `${getOffset(entry.endDay)}%`
        }} class={barStyle}>
          {entry}
          {entry.entry.name},{entry.entry.startDay}, {entry.entry.endDay}
        </div >
      }</For>
    </div>
  );
}

export default App;
