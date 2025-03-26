import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/drivers/$driversId')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/drivers/$driversId"!</div>
}
