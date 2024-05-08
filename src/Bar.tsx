
import type { TimelineEntry } from "./Types"
import { Switch, Match } from "solid-js";

interface BarEntry {
  startDay: number,
  endDay: number,
  entry: TimelineEntry
}

function getOffset(day: number): string {
  return (day / daysInYear * 100).toFixed(2);
}

function getBarStyle(color: string = "orange"): string {
  return `h-10 bg-${color}-300 flex items-center opacity-75 justify-center rounded-md my-1`;
}

function getArrowStyle(color: string = "orange"): string {
  return `-rotate-45 h-9 w-9 bg-${color}-300 flex items-center opacity-75 justify-center rounded-md my-1`;
}

const daysInYear = 365; // TODO:Handle viscosny).

interface BarEntryProps {
  entry: BarEntry
}
export function Bar(props: BarEntryProps) {
  const entry: BarEntry = props.entry;
  const shape = entry.endDay - entry.startDay < 10 ? 'arrow' : 'bar';
  return <div class='has-tooltip' style={{
    "transform": `translateX(${getOffset(entry.startDay)}cqw)`,
  }}><span class='tooltip rounded shadow-xl p-2 bg-gray-100'>
      {entry.entry.start} → {entry.entry.end}
    </span>
    <Switch fallback={<div>Bar is not supported</div>}>
      <Match when={shape === "arrow"}>
        <div class={getArrowStyle(entry.entry.color)}>
          <p class="rotate-45 text-sm stroke-cyan-500">{entry.entry.name}</p>
        </div>
      </Match>
      <Match when={shape === "bar"}>
        <div style={{
          "width": `${getOffset(entry.endDay - entry.startDay)}%`
        }} class={getBarStyle(entry.entry.color)}>
          <p class="text-sm">{entry.entry.name}</p>
        </div>
      </Match>
    </Switch >
  </div >
}
