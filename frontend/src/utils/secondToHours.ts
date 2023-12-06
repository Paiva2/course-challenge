export default function secondsToHours(seconds: number) {
  let courseTime = ""

  const hours = seconds / 3600

  const hoursFixed = hours.toFixed(2)

  const splitHours = hoursFixed.split(".")

  if (splitHours.length > 0) {
    courseTime = `${splitHours[0]}h ${splitHours[1]}m`
  }

  if (splitHours[1] === "00") {
    courseTime = `${splitHours[0]}h`
  }

  return courseTime
}
