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

interface Moment {
  start: number,
  end: number,
  name: string,
}

function createYear(): Moment[] {
  return [
    { "start": 1, "end": 31, "name": "Jan" },
    { "start": 32, "end": 59, "name": "Feb" },  // Ends on day 59 in non-leap years
    { "start": 60, "end": 90, "name": "Mar" },
    { "start": 91, "end": 120, "name": "Apr" },
    { "start": 121, "end": 151, "name": "May" },
    { "start": 152, "end": 181, "name": "Jun" },
    { "start": 182, "end": 212, "name": "Jul" },
    { "start": 213, "end": 243, "name": "Aug" },
    { "start": 244, "end": 273, "name": "Sep" },
    { "start": 274, "end": 304, "name": "Oct" },
    { "start": 305, "end": 334, "name": "Nov" },
    { "start": 335, "end": 365, "name": "Dec" }
  ];
}
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

const monthWidth = 100 / 12;
const daysInYear = 365; // TODO:Handle viscosny).
const entryStyle = "h-10 bg-orange-300 flex items-center opacity-75 justify-center rounded-md my-1";
const App: Component = () => {
  const temp = tl.ranges.map((e) => convertTimelineEntryToBarEntry(e));
  const year = createYear();
  return (
    <div class="p-1">
      <div style={{
        "background-position-x": "4.65%",
        "background-image": "radial-gradient(circle, #000 .5px, rgba(0, 0, 0, 0) .5px)"
      }} class="w-screen bg-[length:8.33%_4%]">
        <div class="">
          <For each={temp}>{(entry) =>
            <div style={{
              "left": `${getOffset(entry.startDay)}%`,
              "width": `${getOffset(entry.endDay)}%`
            }} class={entryStyle}>
              {entry.entry.name},{entry.entry.start}, {entry.entry.end}
            </div >
          }</For>
        </div>
        <div class="flex w-screen ">
          <For each={year}>{(month) =>
            <div style={{
              "width": `${monthWidth}%`
            }}>
              <div class="text-xs ml-1">{month.name}</div>
            </div>
          }</For>
        </div>
      </div>
    </div >
  );
}

export default App;
