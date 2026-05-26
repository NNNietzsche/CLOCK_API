(function () {
  const currentScript = document.currentScript;
  const scriptUrl = currentScript ? new URL(currentScript.src) : new URL("./", location.href);
  const baseUrl = new URL(".", scriptUrl).href;

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

  function getTime() {
    const now = new Date();
    const hour = now.getHours();
    const minute = now.getMinutes();
    const second = now.getSeconds();
    const millisecond = now.getMilliseconds();
    const secondsToday = hour * 3600 + minute * 60 + second + millisecond / 1000;
    const dayRatio = secondsToday / 86400;

    return {
      year: now.getFullYear(),
      month: pad(now.getMonth() + 1),
      day: pad(now.getDate()),
      dayOfWeek: weekdays[now.getDay()],
      hour: pad(hour),
      minute: pad(minute),
      second: pad(second),
      millisecond,
      dayRatio,
      dayProgress: dayRatio * 100,
      hourNumber: hour,
      minuteNumber: minute,
      secondNumber: second,
    };
  }

  function applyTimeTheme(root, dayRatio) {
    const dayLight = (1 - Math.cos(dayRatio * Math.PI * 2)) / 2;
    const background = mixColor(dayTheme.midnight, dayTheme.noon, dayLight);
    const isBright = dayLight > 0.58;
    const ink = isBright ? [10, 13, 18] : [246, 241, 232];
    const number = isBright ? [12, 50, 140] : dayTheme.accentYellow;
    const clockFill = mixColor(background, isBright ? [255, 255, 255] : [25, 35, 48], 0.28);
    const clockBorder = isBright ? [24, 23, 22] : [246, 241, 232];
    const glowAlpha = isBright ? 0.34 : 0.72;

    root.style.setProperty("--code-clock-bg", rgb(background));
    root.style.setProperty("--code-clock-text", rgb(ink));
    root.style.setProperty("--code-clock-ink", rgb(ink));
    root.style.setProperty("--code-clock-blue", rgb(dayTheme.accentBlue));
    root.style.setProperty("--code-clock-yellow", rgb(number));
    root.style.setProperty("--code-clock-coral", rgb(dayTheme.accentCoral));
    root.style.setProperty("--code-clock-fill", rgba(clockFill, 0.9));
    root.style.setProperty("--code-clock-border", rgba(clockBorder, 0.92));
    root.style.setProperty("--code-clock-glow", rgba(dayTheme.accentCoral, glowAlpha));
  }

  function styles() {
    return `
      @font-face {
        font-family: "CodeClockFont";
        src: url("${baseUrl}fonts/CascadiaMono.ttf") format("truetype");
        font-display: swap;
      }

      :host {
        --code-clock-bg: #344d63;
        --code-clock-text: #f6f1e8;
        --code-clock-ink: #f6f1e8;
        --code-clock-blue: #55a9ff;
        --code-clock-yellow: #fff4a8;
        --code-clock-coral: #e08a66;
        --code-clock-second: #e59a72;
        --code-clock-fill: rgba(52, 77, 99, 0.84);
        --code-clock-border: rgba(246, 241, 232, 0.9);
        --code-clock-glow: rgba(255, 199, 170, 0.72);
        display: block;
        width: 100%;
        min-height: 100vh;
        background: var(--code-clock-bg);
        color: var(--code-clock-text);
        font-family: "CodeClockFont", "Cascadia Code", Consolas, "Courier New", monospace;
        font-weight: 300;
        font-variant-ligatures: none;
        transition: background 900ms ease, color 900ms ease;
      }

      * {
        box-sizing: border-box;
      }

      .wrap {
        min-height: inherit;
        display: grid;
        place-items: center;
      }

      .clock-shell {
        width: fit-content;
        max-width: 96vw;
        display: grid;
        grid-template-columns: max-content max-content;
        align-items: center;
        justify-content: center;
        gap: clamp(28px, 5vw, 72px);
        padding: clamp(18px, 4vw, 40px);
      }

      pre {
        margin: 0;
        white-space: pre;
        font-family: inherit;
        font-weight: 300;
        font-size: clamp(16px, 3vw, 22px);
        line-height: 1.58;
        letter-spacing: 0;
      }

      code {
        color: var(--code-clock-text);
        font-family: inherit;
        font-weight: 300;
      }

      .keyword,
      .prop {
        color: var(--code-clock-blue);
      }

      .number {
        color: var(--code-clock-yellow);
      }

      .string {
        color: var(--code-clock-coral);
      }

      .analog-clock {
        display: grid;
        place-items: center;
      }

      .clock-face {
        position: relative;
        width: clamp(150px, 24vw, 188px);
        aspect-ratio: 1;
        border: 3px solid var(--code-clock-border);
        border-radius: 50%;
        background: var(--code-clock-fill);
        box-shadow:
          0 0 0 1px rgba(255, 255, 255, 0.05) inset,
          0 0 20px var(--code-clock-glow),
          0 0 36px rgba(255, 199, 170, 0.28);
        transition: background 900ms ease, border-color 900ms ease, box-shadow 900ms ease;
      }

      .hand {
        position: absolute;
        left: 50%;
        bottom: 50%;
        width: 4px;
        border-radius: 99px;
        transform-origin: 50% 100%;
        translate: -50% 0;
        transition: background 900ms ease;
      }

      .hour-hand {
        height: 35%;
        background: var(--code-clock-ink);
        opacity: 0.82;
      }

      .minute-hand {
        height: 44%;
        background: var(--code-clock-ink);
      }

      .second-hand {
        width: 3px;
        height: 44%;
        background: var(--code-clock-second);
      }

      .pin {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 13px;
        aspect-ratio: 1;
        border-radius: 50%;
        background: var(--code-clock-ink);
        translate: -50% -50%;
        box-shadow: 0 0 8px rgba(255, 255, 255, 0.35);
      }

      @media (max-width: 720px) {
        .clock-shell {
          width: min-content;
          max-width: 100vw;
          grid-template-columns: 1fr;
          justify-items: center;
          gap: 34px;
          padding: 28px 18px 42px;
        }

        .code-panel {
          width: min-content;
          max-width: 100%;
          overflow-x: auto;
          padding-bottom: 8px;
        }

        pre {
          font-size: clamp(14px, 4.5vw, 19px);
        }

        .analog-clock {
          order: -1;
        }
      }
    `;
  }

  function template() {
    return `
      <div class="wrap">
        <main class="clock-shell" aria-label="实时代码时钟">
          <section class="code-panel" aria-live="polite">
            <pre><code><span class="keyword">const</span> currentTime = {
  <span class="prop">year</span>: <span class="number" data-key="year">2026</span>,
  <span class="prop">month</span>: <span class="number" data-key="month">05</span>,
  <span class="prop">day</span>: <span class="number" data-key="day">26</span>,
  <span class="prop">dayOfWeek</span>: <span class="string" data-key="dayOfWeek">"Tuesday"</span>,
  <span class="prop">hour</span>: <span class="number" data-key="hour">22</span>,
  <span class="prop">minute</span>: <span class="number" data-key="minute">37</span>,
  <span class="prop">second</span>: <span class="number" data-key="second">56</span>,
  <span class="prop">dayProgress</span>: <span class="number" data-key="dayProgress">94.30%</span>
};</code></pre>
          </section>

          <section class="analog-clock" aria-label="模拟时钟">
            <div class="clock-face">
              <span class="hand hour-hand" data-hand="hour"></span>
              <span class="hand minute-hand" data-hand="minute"></span>
              <span class="hand second-hand" data-hand="second"></span>
              <span class="pin"></span>
            </div>
          </section>
        </main>
      </div>
    `;
  }

  function mount(target) {
    const container = typeof target === "string" ? document.querySelector(target) : target;

    if (!container) {
      throw new Error("CodeClock.mount target not found");
    }

    const shadow = container.attachShadow({ mode: "open" });
    shadow.innerHTML = `<style>${styles()}</style>${template()}`;

    const nodes = {
      year: shadow.querySelector('[data-key="year"]'),
      month: shadow.querySelector('[data-key="month"]'),
      day: shadow.querySelector('[data-key="day"]'),
      dayOfWeek: shadow.querySelector('[data-key="dayOfWeek"]'),
      hour: shadow.querySelector('[data-key="hour"]'),
      minute: shadow.querySelector('[data-key="minute"]'),
      second: shadow.querySelector('[data-key="second"]'),
      dayProgress: shadow.querySelector('[data-key="dayProgress"]'),
      hourHand: shadow.querySelector('[data-hand="hour"]'),
      minuteHand: shadow.querySelector('[data-hand="minute"]'),
      secondHand: shadow.querySelector('[data-hand="second"]'),
    };

    let animationId = 0;

    function render() {
      const time = getTime();
      nodes.year.textContent = time.year;
      nodes.month.textContent = time.month;
      nodes.day.textContent = time.day;
      nodes.dayOfWeek.textContent = `"${time.dayOfWeek}"`;
      nodes.hour.textContent = time.hour;
      nodes.minute.textContent = time.minute;
      nodes.second.textContent = time.second;
      nodes.dayProgress.textContent = `${time.dayProgress.toFixed(2)}%`;

      nodes.secondHand.style.rotate = `${(time.secondNumber + time.millisecond / 1000) * 6}deg`;
      nodes.minuteHand.style.rotate = `${(time.minuteNumber + time.secondNumber / 60) * 6}deg`;
      nodes.hourHand.style.rotate = `${((time.hourNumber % 12) + time.minuteNumber / 60) * 30}deg`;
      applyTimeTheme(shadow.host, time.dayRatio);

      animationId = requestAnimationFrame(render);
    }

    render();

    return {
      destroy() {
        cancelAnimationFrame(animationId);
        shadow.innerHTML = "";
      },
    };
  }

  window.CodeClock = {
    mount,
  };

  document.querySelectorAll("[data-code-clock]").forEach((element) => mount(element));
})();
