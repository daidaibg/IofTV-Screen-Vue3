export interface DateDataType {
    dateDay: string,
    dateYear: string,
    dateWeek: string,
    timing: NodeJS.Timer
}   

interface CountUpOptions {
    startVal?: number; // number to start at (0)
    decimalPlaces?: number; // number of decimal places (0)
    duration?: number; // animation duration in seconds (2)
    useGrouping?: boolean; // example: 1,000 vs 1000 (true)
    useEasing?: boolean; // ease animation (true)
    smartEasingThreshold?: number; // smooth easing for large numbers above this if useEasing (999)
    smartEasingAmount?: number; // amount to be eased for numbers above threshold (333)
    separator?: string; // grouping separator (',')
    decimal?: string; // decimal ('.')
    // easingFn: easing function for animation (easeOutExpo)
    easingFn?: (t: number, b: number, c: number, d: number) => number;
    formattingFn?: (n: number) => string; // this function formats result
    prefix?: string; // text prepended to result
    suffix?: string; // text appended to result
    numerals?: string[]; // numeral glyph substitution
    enableScrollSpy?: boolean; // start animation when target is in view
    scrollSpyDelay?: number; // delay (ms) after target comes into view
    scrollSpyOnce?: boolean; // run only once
  }