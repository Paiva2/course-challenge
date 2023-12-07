export default function formatInputToHours(durationInput: HTMLInputElement) {
  const removeSpecialCaracters = durationInput.value.replace(/\D/g, "")

  let formattedHour = ""

  if (removeSpecialCaracters.length > 0) {
    formattedHour = removeSpecialCaracters[0]

    if (removeSpecialCaracters.length > 1) {
      let minutes = removeSpecialCaracters.substring(1, 3)

      if (+minutes >= 60) {
        minutes = "00"

        formattedHour = String(Number(formattedHour) + 1)
      }

      formattedHour += ":"

      formattedHour += minutes

      formattedHour = formattedHour.substring(0, 5)
    }
  }

  durationInput.value = formattedHour
}
