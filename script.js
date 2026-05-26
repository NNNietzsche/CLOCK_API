const elements = {
  year: document.getElementById("year"),
  month: document.getElementById("month"),
  day: document.getElementById("day"),
  dayOfWeek: document.getElementById("dayOfWeek"),
  hour: document.getElementById("hour"),
  minute: document.getElementById("minute"),
  second: document.getElementById("second"),
  dayProgress: document.getElementById("dayProgress"),
  hourHand: document.getElementById("hourHand"),
  minuteHand: document.getElementById("minuteHand"),
  secondHand: document.getElementById("secondHand"),
};

const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const dayTheme = {
  midnight: [5, 7, 11],
  noon: [245, 245, 243],
  accentBlue: [77, 161, 255],
  accentYellow: [255, 240, 131],
  accentCoral: [222, 137, 102],
};

function pad(value) {
  return String(value).padStart(2, "0");
}

function mixColor(start, end, amount) {
  return start.map((channel, index) =>
    Math.round(channel + (end[index] - channel) * amount),
  );
}

function rgb(color) {
  return `rgb(${color.join(", ")})`;
}

function rgba(color, alpha) {
  return `rgba(${color.join(", ")}, ${alpha})`;
}

function applyTimeTheme(progress) {
  const dayLight = (1 - Math.cos(progress * Math.PI * 2)) / 2;
  const background = mixColor(dayTheme.midnight, dayTheme.noon, dayLight);
  const isBright = dayLight > 0.58;
  const ink = isBright ? [10, 13, 18] : [246, 241, 232];
  const number = isBright ? [12, 50, 140] : dayTheme.accentYellow;
  const clockFill = mixColor(background, isBright ? [255, 255, 255] : [25, 35, 48], 0.28);
  const clockBorder = isBright ? [24, 23, 22] : [246, 241, 232];
  const glowAlpha = isBright ? 0.34 : 0.72;

  document.documentElement.style.setProperty("--bg", rgb(background));
  document.documentElement.style.setProperty("--text", rgb(ink));
  document.documentElement.style.setProperty("--ink", rgb(ink));
  document.documentElement.style.setProperty("--blue", rgb(dayTheme.accentBlue));
  document.documentElement.style.setProperty("--yellow", rgb(number));
  document.documentElement.style.setProperty("--coral", rgb(dayTheme.accentCoral));
  document.documentElement.style.setProperty("--clock-fill", rgba(clockFill, 0.9));
  document.documentElement.style.setProperty("--clock-border", rgba(clockBorder, 0.92));
  document.documentElement.style.setProperty("--clock-glow", rgba(dayTheme.accentCoral, glowAlpha));
}

function updateClock() {
  const now = new Date();
  const hour = now.getHours();
  const minute = now.getMinutes();
  const second = now.getSeconds();
  const millisecond = now.getMilliseconds();
  const secondsToday = hour * 3600 + minute * 60 + second + millisecond / 1000;
  const dayRatio = secondsToday / 86400;
  const progress = dayRatio * 100;

  elements.year.textContent = now.getFullYear();
  elements.month.textContent = pad(now.getMonth() + 1);
  elements.day.textContent = pad(now.getDate());
  elements.dayOfWeek.textContent = `"${weekdays[now.getDay()]}"`;
  elements.hour.textContent = pad(hour);
  elements.minute.textContent = pad(minute);
  elements.second.textContent = pad(second);
  elements.dayProgress.textContent = `${progress.toFixed(2)}%`;

  const secondDegrees = (second + millisecond / 1000) * 6;
  const minuteDegrees = (minute + second / 60) * 6;
  const hourDegrees = ((hour % 12) + minute / 60) * 30;

  elements.secondHand.style.rotate = `${secondDegrees}deg`;
  elements.minuteHand.style.rotate = `${minuteDegrees}deg`;
  elements.hourHand.style.rotate = `${hourDegrees}deg`;
  applyTimeTheme(dayRatio);

  requestAnimationFrame(updateClock);
}

updateClock();
