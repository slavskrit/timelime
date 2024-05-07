
export interface TimelineEntry {
  start: string,
  end: string,
  name: string,
  color?: string,
}

export interface Timeline {
  ranges: TimelineEntry[],
}


