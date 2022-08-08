export function format_number(number: number): string {
  if (number >= 1000) {
    const num_parts = number.toFixed(2).split(".");
    return (num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ","));
  } else return number.toFixed(2);
}
