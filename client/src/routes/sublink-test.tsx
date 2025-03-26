import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/sublink-test')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/sublink-test"!</div>
}
