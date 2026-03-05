export function generateId(title: string): string {
  const normalized = title.toLowerCase().replaceAll(/\s+/g, '-');
  const random = crypto.randomUUID().slice(0, 8);
  return `${normalized}-${random}`;
}
