import type {Metadata} from "next";

import Exchange from "@/components/Exchange";

export const metadata: Metadata = {
  title: 'Search Page',
  description:
    'We believe in efficiency and maximizing our resources to provide the best value to our clients.',
}

export default function Search() {
    return (
    <div className="bg-white">
      <Exchange />
    </div>
  )
}
