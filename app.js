const needle = document.getElementById("needle");
const headingText = document.getElementById("headingText");
const accuracyText = document.getElementById("accuracyText");
const statusEl = document.getElementById("status");
const enableBtn = document.getElementById("enableBtn");

let lastHeading = null;

function setHeading(deg) {
  // deg: 0..360 where 0 = North
  needle.style.transform = `translateX(-50%) rotate(${deg}deg)`;
  headingText.textContent = deg.toFixed(0);
  lastHeading = deg;
}

function normalize360(x) {
  let v = x % 360;
  if (v < 0) v += 360;
  return v;
}

function handleOrientation(e) {
  // iOS Safari provides true compass heading:
  // e.webkitCompassHeading (0 = North)
  // e.webkitCompassAccuracy (lower is better)
  if (typeof e.webkitCompassHeading === "number") {
    const h = normalize360(e.webkitCompassHeading);
    setHeading(h);
    accuracyText.textContent =
      (typeof e.webkitCompassAccuracy === "number")
        ? `${e.webkitCompassAccuracy.toFixed(0)}°`
        : "iOS";
    statusEl.textContent = "Using iOS compass heading.";
    return;
  }

  // Other browsers: use alpha (may be relative, not true North)
  if (typeof e.alpha === "number") {
    // Convert alpha to a compass-like heading
    const h = normalize360(360 - e.alpha);
    setHeading(h);
    accuracyText.textContent = "relative";
    statusEl.textContent = "Using relative heading (may not be true North).";
    return;
  }

  statusEl.textContent = "Orientation data not available.";
}

async function enableSensor() {
  statusEl.textContent = "Requesting permission…";

  try {
    // iOS permission
    if (typeof DeviceOrientationEvent !== "undefined" &&
        typeof DeviceOrientationEvent.requestPermission === "function") {
      const res = await DeviceOrientationEvent.requestPermission();
      if (res !== "granted") {
        statusEl.textContent = "Permission denied. Enable Motion & Orientation Access in Safari settings.";
        return;
      }
    }

    // Listen to both; some devices fire only one
    window.addEventListener("deviceorientationabsolute", handleOrientation, true);
    window.addEventListener("deviceorientation", handleOrientation, true);

    statusEl.textContent = "Sensor enabled. Move phone in a figure-8 to calibrate.";
  } catch (err) {
    statusEl.textContent = "Sensor blocked/unavailable. Try HTTPS + Safari/Chrome on phone.";
  }
}

enableBtn.addEventListener("click", enableSensor);

// Optional: smooth startup (shows last heading if refresh)
if (lastHeading !== null) setHeading(lastHeading);

if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./sw.js").catch(() => {});
  }
  