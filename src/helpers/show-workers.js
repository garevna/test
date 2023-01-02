export function showWorkers (title, registration) {
  console.group(title)
  const { active, waiting } = registration
  if (title === 'REGISTERED') console.log('REGISTRATION OBJECT:\n', registration)
  console.table([
    { name: active.name, state: active.state },
    { name: waiting ? waiting.name : null, state: waiting ? waiting.state : null }
  ])
  console.groupEnd(title)
}
