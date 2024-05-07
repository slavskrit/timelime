
import type { TimelineEntry } from "./Types"

interface BarEntry {
  startDay: number,
  endDay: number,
  entry: TimelineEntry
}

function getOffset(day: number): string {
  return (day / daysInYear * 100).toFixed(2);
}

function getEntryStyle(color: string): string {
  return `h-10 bg-${color}-300 flex items-center opacity-75 justify-center rounded-md my-1`;
}

const daysInYear = 365; // TODO:Handle viscosny).

interface BarEntryProps {
  entry: BarEntry
}
export function Bar(props: BarEntryProps) {
  const entry: BarEntry = props.entry;
  return <div class='has-tooltip'>
    <div style={{
      "margin-left": `${getOffset(entry.startDay)}%`,
      "width": `${getOffset(entry.endDay - entry.startDay)}%`
    }} class={getEntryStyle(entry.entry.color ?? "orange")}>
      <span class='tooltip rounded shadow-xl p-2 bg-gray-100'>
        {entry.entry.start} → {entry.entry.end}
      </span>
      <p class="text-sm">{entry.entry.name}</p>
    </div>
  </div >
}
