export default function secondsToHours(seconds: number) {
  let courseTime = ""

  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)

  if (hours > 0) {
    courseTime = `${hours}h ${minutes}m`
  }

  if (String(minutes) === "0" || String(minutes) === "00") {
    courseTime = `${hours}h`
  }

  return courseTime
}
