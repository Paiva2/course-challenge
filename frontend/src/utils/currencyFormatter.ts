export default function currencyFormatter(value: number) {
  const valueFormatted = new Intl.NumberFormat("pt-BR", {
    currency: "BRL",
    style: "currency",
  }).format(value)

  return valueFormatted
}
