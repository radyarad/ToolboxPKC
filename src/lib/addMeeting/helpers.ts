export function generateMeetingLink(): string {
  const randomId = Math.random().toString(36).substring(2, 15);
  return `https://meet.google.com/${randomId}`;
}

// Generate random 8-character password
export function generatePassword(): string {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let password = "";
  for (let i = 0; i < 8; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
}
